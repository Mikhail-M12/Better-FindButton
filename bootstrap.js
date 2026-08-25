const Cu = Components.utils;

const Services = globalThis.Services || Cu.import("resource://gre/modules/Services.jsm").Services;

function startup(data,reason) {
// --- WATERFOX 6.7.0 COLD START RUNTIME DELAY BRIDGE --- //thanks to Imold
	let executeDelayedStartup = () => {
		try {forEachOpenWindow(plantrymodifyWindow);
		} catch (e) {
			console.error("Better FindButton delayed initialization error: ", e);
		}
	};

	// Determine if Waterfox is performing a cold boot vs a manual addon toggle
	if (typeof Services !== "undefined" && Services.startup && Services.startup.startingUp) {
		// Browser is starting cold: Wait for window architecture to settle completely
		Services.obs.addObserver(function observer(subject, topic) {
			if (topic === "browser-delayed-startup-finished") {
				Services.obs.removeObserver(observer, "browser-delayed-startup-finished");

				// Yield one more thread cycle to prevent early race conditions
				Services.tm.dispatchToMainThread({
					run: () => { executeDelayedStartup(); }
				});
			}
		}, "browser-delayed-startup-finished");
	} else {// Manual extension toggle or refresh: Windows are ready, execute immediately
		executeDelayedStartup();
	}
	Services.ww.registerNotification(windowObserver);//This don't need to be delayed?
}

function shutdown(data,reason) {
	if (reason == APP_SHUTDOWN)
		return;

	//forEachOpenWindow(demodifyWindow);
	Services.ww.unregisterNotification(windowObserver);

	Services.obs.notifyObservers(null, "chrome-flush-caches", null);//clear all addon related caches
}
function install(data,reason) { }
function uninstall(data,reason) { }

if (Services.vc.compare(Services.appinfo.platformVersion, "61.0") >= 0)
 myfindBtnClick = function() {
	var self = this;
	if (self.gFindBarInitialized === false)
		self.gFindBarPromise.then(function(resolve, reject) {self.gFindBar.onFindCommand();});
	else{
		if (self.gFindBar.hidden === true) self.gFindBar.onFindCommand();
		else self.gFindBar.close();
	}
 }
else{//old browser
 myfindBtnClick = function() {
	if (this.gFindBar.hidden === true) this.gFindBar.onFindCommand();
	else this.gFindBar.close();
 }
}
function modifyWindow(window) {
		let fb = window.document.getElementById("find-button");
	if (fb != null){
		if (fb.getAttribute("better") != null) return "mod";
		fbClone = fb.cloneNode(true);
		fbClone.setAttribute("better",1);
		fbClone.addEventListener("command", myfindBtnClick.bind(window));
		fb.parentElement.replaceChild(fbClone, fb);//atomic(?)
		delete fb;
		fb = null;
		return "mod";
	}else {
		if (window.document.documentElement.getAttribute("windowtype") == "navigator:browser")
			console.log('Please place find button on toolbar and restart.');
		return "no";
	}
}
//function demodifyWindow(window) { }

function plantrymodifyWindow(window) {
	function runOnce() {
		window.removeEventListener("load", runOnce, false);
		modifyWindow(window);
	}
	window.addEventListener("load", runOnce, false);

	if (modifyWindow(window) == "mod"){
		window.removeEventListener("load", runOnce, false);
	}
}

function forEachOpenWindow(todo){ //Apply a function to all open browser windows
	let windows = Services.wm.getEnumerator(null);//"navigator:browser" is better, but implies partial incompatibility with old browser versions
	while (windows.hasMoreElements()){
		let win = windows.getNext();
		todo(win);
	}
}

function windowObserver(wsubject, topic) {
	if (topic == "domwindowopened") {
		plantrymodifyWindow(wsubject);
	}
}
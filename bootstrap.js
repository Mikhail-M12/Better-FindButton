const Cu = Components.utils;

Cu.import("resource://gre/modules/Services.jsm");

function startup(data,reason) {
	forEachOpenWindow(plantrymodifyWindow);
	Services.ww.registerNotification(windowObserver);
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
		fbClone = fb.cloneNode(true);
		fb.parentElement.replaceChild(fbClone, fb);
		fbClone.addEventListener("command", myfindBtnClick.bind(window));
		delete fb;
		fb = null;
	}else console.log('Please place find button on toolbar and restart.');
}
//function demodifyWindow(window) { }

function plantrymodifyWindow(window) {
	if (window.document.readyState != "complete"){
		window.addEventListener("load", function runOnce() {
			window.removeEventListener("load", runOnce, false);
			if (window.document.documentElement.getAttribute("windowtype") == "navigator:browser") modifyWindow(window);
		}, false);
	} else if (window.document.documentElement.getAttribute("windowtype") == "navigator:browser") modifyWindow(window);
}

function forEachOpenWindow(todo){ //Apply a function to all open browser windows
	let windows = Services.wm.getEnumerator(null);//"navigator:browser" is better, but implies partial incompatibility with old browser versions
	while (windows.hasMoreElements()){
		let win = windows.getNext();
		todo(win);
	}
}

function windowObserver(wsubject, topic) {
	if (topic == "domwindowopened")
		plantrymodifyWindow(wsubject);
}
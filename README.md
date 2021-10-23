# Better FindButton
English version of text is below.

Аддон для Firefox/Waterfox/Basilisk, улучшающий кнопку поиска: она будет способна открывать И ЗАКРЫВАТЬ панель поиска.
Поддерживаемые браузеры:
- Firefox 29+ \[\*1\];
- Waterfox 30-56; Waterfox Classic; Waterfox Current/G3/G4;
- Basilisk.

      **УСТАНОВКА**</br>
 Настройки, которые должны быть в about:config перед установкой аддона:</br>
  <b>xpinstall.signatures.required = false</b></br>
  <b>extensions.legacy.enabled = true</b> – для Firefox <=73, Waterfox, Waterfox Classic, Waterfox Current</br>
  <b>extensions.experiments.enabled = true</b> – для Firefox 74+, Waterfox G3/G4</br>

 \*1 В Firefox 48+ перед установкой нужно ещё отключить обязательную проверку подписей аддонов (это не относится к версиям Developer Edition и Nightly), а в Firefox 65+ – ещё включить возможность устанавливать bootstrap-аддоны. Инструкция (https://github.com/xiaoxiaoflood/firefox-scripts#instructions ):</br>
  １. Распакуйте содержимое <b>[этого файла](https://raw.githubusercontent.com/xiaoxiaoflood/firefox-scripts/master/fx-folder.zip)</b> в папку установки Firefox (обычно C:\Program Files\Mozilla Firefox). Это отключит обязательную проверку подписей аддонов.</br>
  ２. Создайте папку chrome в профиле пользователя (папку профиля можно найти в about:profiles , она указана как Root Directory / Корневой каталог).</br>
  ３. Распакуйте в папку chrome содержимое <b>[этого файла](https://raw.githubusercontent.com/xiaoxiaoflood/firefox-scripts/master/utils_extensions_only.zip)</b>. Это позволит устанавливать bootstrap-аддоны.</br>
  ４, ５. \[Пункты 4 и 5 не требуются для установки bootstrap-аддонов.\]</br>
  ６. Откройте about:support и кликните "Clear startup cache…" / "Очистить кэш запуска…".</br>
  ７. Перезапустите Firefox.

 Перед установкой Better FindButton разместите кнопку поиска на панели инструментов. Далее для установки скачайте <b>[xpi-файл](https://github.com/Mikhail-M12/Better-FindButton/releases/download/v1.0/betterfindbutton.xpi)</b> и откройте его в браузере.



****************************************************

Addon for Firefox/Waterfox/Basilisk that improves find button: it will be able to open AND TO CLOSE findbar.
Supported browsers:
- Firefox 29+ \[\*1\];
- Waterfox 30-56; Waterfox Classic; Waterfox Current/G3/G4;
- Basilisk.

      **INSTALLATION**</br>
 about:config entries must be set before install:</br>
  <b>xpinstall.signatures.required = false</b></br>
  <b>extensions.legacy.enabled = true</b> – for Firefox <=73, Waterfox, Waterfox Classic, Waterfox Current</br>
  <b>extensions.experiments.enabled = true</b> – for Firefox 74+, Waterfox G3</br>

 \*1 In Firefox 48+ before installing Better FindButton, mandatory addon signature checking must be disabled (it doesn't affect Developer Edition and Nightly versions), and in Firefox 65+ ability of installing of bootstrap addons must be enabled. Instructions: https://github.com/xiaoxiaoflood/firefox-scripts#instructions

 Before installing Better FindButton place find button onto toolbar. Then for installation download <b>[xpi-file](https://github.com/Mikhail-M12/Better-FindButton/releases/download/v1.0/betterfindbutton.xpi)</b> and open it in browser.

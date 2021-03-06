var script = document.currentScript;

var exec = require('child_process').exec;

require('./test.js');

include(['src/libraries/difflib.js'], function() {
  console.log(µ('|>window', script));
  var main = µ('win-dow[name=' + µ('|>window', script) + ']')[0];
  console.log(main);
  var menu = µ('.winMenu', main)[0];

  var file = document.createElement('menu-item');
  file.addTitle('File');
  file.addOption('Open');

  file.addOption('Open folder...');
  file.addDivider();
  file.addOption('Print...');

  file.addDivider();
  file.addOption('Close', function() {
    main.close();
  });

  menu.appendChild(file);

  var edit = document.createElement('menu-item');
  edit.addTitle('Edit');
  edit.addOption('Undo');
  edit.addOption('Redo');
  edit.addDivider();
  edit.addOption('Copy');
  edit.addOption('Paste');

  menu.appendChild(edit);

  var hist = document.createElement('menu-item');
  hist.addTitle('History');
  hist.addOption('Home', function() {
    main.navigate('data/drk/home.html', 'www.doctork.com');
  });

  hist.addDivider();
  hist.addOption('Recently Visited');
  hist.addOption('MadSci Blog', function() {
    main.navigate('data/drk/error.html', 'www.madblog.com');
  });

  hist.addOption('Zombie Recipes', function() {
    main.navigate('data/drk/error.html', 'www.zombo.com');
  });

  menu.appendChild(hist);

  var help = document.createElement('menu-item');
  help.addTitle('Help');
  help.addOption('Help...');

  menu.appendChild(help);

  var div = µ('+div', menu);
  div.className = 'entryDivider';

  var address = µ('+div', menu);
  address.className = 'addressBar';

  var addLbl = µ('+div', address);
  addLbl.textContent = 'Address';

  var addBox = µ('+div', address);
  addBox.className = 'addressBox inset';
  addBox.contentEditable = true;
  addBox.textContent = 'www.doctork.com';

  menu.style.height = '42px';

  main.resetContentHeight();

  main.changeSize(640, 480);

  main.navigate = function(add, fakeAddress) {
    if (~add.indexOf('http://')) {
      add = add.substring(7);
    }

    console.log(add + ' is the address');

    var comp = new difflib.SequenceMatcher(add, 'www.labsecurity.com/drk');
    if (~add.indexOf('www.labsecurity.com/drk')) add = 'data/drk/video.html';
    else if (comp.ratio() > 0.9) {
      add = 'data/drk/close.html';
    } else if (add == 'data/drk/home.html') {
      add = 'data/drk/home.html';
    } else if (add == 'retrofit://shutdown') {
      exec('sudo shutdown now', function(err, out, sterr) {
        console.log(out);
      });

      add = 'data/drk/shutdown.html';
    } else if (~add.indexOf('retrofit://ipConfig')) {
      var os = require('os');

      var addresses = '';

      var interfaces = os.networkInterfaces();
      var addresses = [];
      for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
          var address = interfaces[k][k2];
          if (address.family === 'IPv4' && !address.internal) {
            //addresses.push(address.address);
            addresses += address.address + '; ';
          }
        }
      }

      //cur = newPrompt(addresses);
      addBox.textContent = addresses;
    } else if (~add.indexOf('retrofit://wifiConfig')) {
      //console.log()
      //require('./wifi.js').writeConfig();
      µ('#wifi').openWindow();
    } else {
      add = 'data/drk/error.html';
    }

    µ('#load', main).src = add;
    if (fakeAddress) addBox.textContent = fakeAddress;
  };

  addBox.onkeypress = function(e) {
    var keyCode = e.keyCode;
    if (keyCode === 13) {
      e.preventDefault();
      main.navigate(addBox.textContent);
      addBox.blur();
    }
  };

  main.content.onmousedown = function() {

  };

  main.style.visibility = 'visible';
});

const _ = require('lodash')

class XPrinter {
  constructor(device) {
    this.device = device
  }

  Write(data) {
    const _t = this;
    return new Promise((resolve, reject) => {
      _t.device.open();
      let iface = _t.device.interface(0);
      function closeConnection() {
        if (iface) {
          try {
            _t.device.close();
          } catch (e) {
            setTimeout(closeConnection, 1000)
          }
        }
      }
      if (/^linux/.test(process.platform) || /^android/.test(process.platform)) {
        console.log('Linux!!!');
        if (iface.isKernelDriverActive()) {
          try {
            iface.detachKernelDriver();
          } catch (e) {
            console.error("[ERROR] Could not detatch kernel driver: %s", e)
          }
        }
      }

      iface.claim();
      let outEndpoint = _.find(iface.endpoints, { direction: 'out' });
      let inEndpoint = _.find(iface.endpoints, { direction: 'in' });

      let finish = false;
      let transfered = false;

      function _resolve() {
        inEndpoint.stopPoll(function () {
          iface.release(() => {
            console.log('usb print finished !');
            closeConnection();
            resolve();
          })
        })
      }

      inEndpoint.on('data', function (data) {
        if (!finish && data.length !== 0) {
          finish = true;
          if (transfered)
            _resolve();
        }
      })

      inEndpoint.on('error', function (e) {
        console.warn(e);
        closeConnection();
        return reject(e);
      })

      inEndpoint.startPoll(2, 8);

      outEndpoint.transfer(data, err => {
        transfered = true;
        console.log('transfer finished!');
        if (err) {
          console.log('USB CRASH'.red);
          console.warn(err);
          closeConnection();
          return reject(err);
        }

        if (finish) {
          _resolve();
        } else {
          setTimeout(function () {
            console.log('print Timeout !!!')
            if (!finish) {
              _resolve();
              finish = true;
            }
          }, 1500);
        }
      });

      outEndpoint.on('error', function (e) {
        console.warn(e);
        closeConnection();
        return reject(err);
      })
    })
  }
}

module.exports = XPrinter

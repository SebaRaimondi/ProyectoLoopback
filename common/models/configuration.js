'use strict';

module.exports = function(Configuration) {

  /**
   * Gets card title and description
   * @param {Function(Error, object)} callback
   */

  Configuration.cards = function(callback) {
    var filters = {
      fields: {
        title1: true,
        title2: true,
        title3: true,
        descripcion1: true,
        descripcion2: true,
        descripcion3: true,
      }
    };

    this.findOne(filters, function(err, config) {
      if (err) {
        callback(err);
      } else {
        var cards = [{
            "title": config.title1,
            "description1": config.descripcion1
          },
          {
            "title": config.title2,
            "description1": config.descripcion2
          },
          {
            "title": config.title3,
            "description1": config.descripcion3
          }
        ];
        callback(null, cards);
      };
    });
  };

  /**
   * Toggles maintainance
   * @param {Function(Error, object)} callback
   */

  Configuration.toggleMaintainance = function(callback) {
    this.findOne(function(err, config) {
      if (err) {
        callback(err);
      } else {
        config.maintenance = !config.maintenance;
        config.save(function(err) {
          if (err) {
            callback(err);
          } else {
            let msg = (config.maintenance ? 'activated' : 'deactivated');
            callback(null, 'Maintenance ' + msg);
          }
        });
      };
    });
  };

  /**
   * Activates maintenance
   * @param {Function(Error, object)} callback
   */

  Configuration.activateMaintenance = function(callback) {
    this.findOne(function(err, config) {
      if (err) {
        callback(err);
      } else {
        config.maintenance = true;
        config.save(function(err) {
          if (err) {
            callback(err);
          } else {
            callback(null, 'Maintenance activated');
          }
        });
      };
    });
  };

  /**
   * Deactivates Maintenance
   * @param {Function(Error, object)} callback
   */

  Configuration.deactivateMaintenance = function(callback) {
    this.findOne(function(err, config) {
      if (err) {
        callback(err);
      } else {
        config.maintenance = false;
        config.save(function(err) {
          if (err) {
            callback(err);
          } else {
            callback(null, 'Maintenance deactivated');
          }
        });
      };
    });
  };

  /**
   * Returns maintenance status
   * @param {Function(Error, boolean)} callback
   */

  Configuration.maintenance = function(callback) {
    this.findOne(function(err, config) {
      if (err) {
        callback(err);
      } else {
        callback(null, config.maintenance);
      };
    });
  };

};
/* Author: 

*/

$(document).ready(function() {
    var $domainInput = $("#domain-input"),
    $domains = $("#domains"),
    $price = $("#price"),
    $alwaysOn = $("#always-on"),
    $diskStorage = $("#disk-storage"),
    $dbStorage = $("#db-storage"),
    $diskStorageDisplay = $("#disk-storage-display"),
    $dbStorageDisplay = $("#db-storage-display");

    // Prices in cents
    var diskPricePerMB = 5,
    dbPricePerMB = 5
    perDomain = 500,
    alwaysOn = 3000;

    // Free plan variables
    var freeDiskStorage = 100,
    freeDBStorage = 5;
    
    urlRegex = /[-a-z0-9]+\.[-a-z0-9]/;

    var updatePrice = function() {
        
        var price =
            //         Item                 Price
            //       ============================
            Math.max((parseInt($diskStorage.val() - freeDiskStorage) * diskPricePerMB), 0) +
            Math.max((parseInt($dbStorage.val()   - freeDBStorage)   * dbPricePerMB), 0)   +
            ($alwaysOn.is(':checked') ?     alwaysOn : 0) +
            ($domains.children().length   * perDomain);

        $diskStorageDisplay.text($diskStorage.val());
        $dbStorageDisplay.text($dbStorage.val());
        
        // console.log("updating price to: " + (price / 100));
        $price.text((4500 + price) / 100);
    };

    $domainInput.bind('keydown', function(event) {
        var $input = $(this);

        if (13 == event.keyCode) {
            if ($input.val().length > 0 && $input.val().match(urlRegex)) {
                $domains.append('<li>' + $input.val() + '</li>');
                $input.val('');

                updatePrice();
            }
        }
    });

    $alwaysOn.bind('change', updatePrice);
    $diskStorage.bind('change', updatePrice);
    $dbStorage.bind('change', updatePrice);

    updatePrice();

    // console.log("Ready!");
});

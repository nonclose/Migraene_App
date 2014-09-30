angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  },

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Schmerzart und -ort', id: 1 },
    { title: 'Begleitsymptome', id: 2 },
    { title: 'Ausloeser', id: 3 },
    { title: 'Medikamente', id: 4 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
	$scope.schmerzartList = [
		{ text: 'pochend', value: 'po' },
		{ text: 'pulsierend', value: 'pul' },
		{ text: 'dumpf', value: 'dum' },
		{ text: 'drueckend', value: 'dr' },
		{ text: 'stechend', value: 'stech' }
  ];
})

.controller('BegleitsymptomeCtrl', function($scope) {
	$scope.begleitsymptomeList = [
		{ text: 'Uebelkeit', checked: true },
		{ text: 'Erbrechen', checked: false },
		{ text: 'Muedigkeit', checked: false },
		{ text: 'Laerm-/Lichtscheu', checked: false },
		{ text: 'Sehstoerungen', checked: false },
		{ text: 'Appetitlosigkeit', checked: false },
		{ text: 'Verstopfung', checked: false },
		{ text: 'Durchfall', checked: false},
		{ text: 'Blaehungen', checked: false },
		{ text: 'Froesteln', checked: false },
		{ text: 'Zittern', checked: false },
		{ text: 'Geruchssensitivitaet', checked: false },
		{ text: 'Stimmungsschwankungen', checked: false }
  ];
})

.controller('AusloeserCtrl', function($scope) {
	$scope.koerperlicheList = [
		{ text: 'Ausregung/Stress', checked: true },
		{ text: 'Erholungspphase', checked: false },
		{ text: 'Aenderung im Schlaf', checked: false },
		{ text: 'unregelmaessige Mahlzeiten', checked: false },
		{ text: 'Menstruation', checked: false },
		{ text: 'Sport', checked: false },
		{ text: 'Wettereinfluesse', checked: false },
		{ text: 'Unfall', checked: false },
		{ text: 'Laerm, Licht, Gerueche', checked: false },
		{ text: 'Flussigkeitsmangel', checked: false }
		
  ];
	$scope.nahrungsmittelList = [
		{ text: 'Kaese', checked: true },
		{ text: 'Alkoholische Getraenke', checked: false },
		{ text: 'Schokolade', vchecked: false },
		{ text: 'Kaffe, Cola', checked: false },
		{ text: 'Medikamente', checked: false }
  ];
})

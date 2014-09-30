angular.module('starter.controllers', [])

.factory('Projects', function() {
  return {
    all: function() {
      var projectString = window.localStorage['projects'];
      if(projectString) {
        return angular.fromJson(projectString);
      }
      return [];
    },
    save: function(projects) {
      window.localStorage['projects'] = angular.toJson(projects);
    },
    newProject: function(projectTitle) {
      // Add a new project
      return {
        title: projectTitle,
        tasks: []
      };
    },
    getLastActiveIndex: function() {
      return parseInt(window.localStorage['lastActiveProject']) || 0;
    },
    setLastActiveIndex: function(index) {
      window.localStorage['lastActiveProject'] = index;
    }
  }
})


.controller('AppCtrl', function($scope) {

})


.controller('PlaylistsCtrl', function($scope, $ionicModal, $timeout, Projects, $ionicSideMenuDelegate, $filter) {
 
	// No need for testing data anymore
	$scope.tasks = [];

	// Create and load the Modal
	/*$ionicModal.fromTemplateUrl('new-task.html', function(modal) {
	$scope.taskModal = modal;
	}, {
	scope: $scope,
	animation: 'slide-in-up'
	});*/
  
	var createProject = function(projectTitle) {
		var newProject = Projects.newProject(projectTitle);
		$scope.projects.push(newProject);
		Projects.save($scope.projects);
		$scope.selectProject(newProject, $scope.projects.length-1);
	}

	// Load or initialize projects
	$scope.projects = Projects.all();
  
	$scope.saveEintrag = function(eintrag) {
		if(!$scope.activeProject || !eintrag) {
		  return;
		}
		$scope.activeProject.tasks.push({
		  name: eintrag.name
		});
		$scope.taskModal.hide();

		// Inefficient, but save all the projects
		Projects.save($scope.projects);

		eintrag.name = "";
	};
  
	//Auswahldaten 
	$scope.eintrag = {
        ids: {1 : true}
    };
  
	$scope.schmerzart = [
		{ name: 'pochend', id: 1 },
		{ name: 'pulsierend', id: 2 },
		{ name: 'dumpf', id: 3 },
		{ name: 'drückend', id: 4 },
		{ name: 'stechend', id: 5 }
	];
  
	$scope.schmerzort = [
		{ name: 'einseitig', id: 1 },
		{ name: 'beidseitig', id: 2 }
	];
  
	$scope.begleitsymptome = [
		{ name: 'Erbrechen', id: 1, checked: "true" },
		{ name: 'Übelkeit', id:2, checked: "false" },
		{ name: 'Sehstörungen', id:3, checked: "false" },
		{ name: 'Lärm-/Lichtscheu', id:4, checked: "false" },
		{ name: 'Müdigkeit', id:5, checked: "false" },
		{ name: 'Appetitlosigkeit', id:6, checked: "false" },
		{ name: 'Verstopfung', id:7, checked: "false" },
		{ name: 'Durchfall', id:8, checked: "false" },
		{ name: 'Blähungen', id:9, checked: "false" },
		{ name: 'Frösteln', id:10, checked: "false" },
		{ name: 'Zittern', id:11, checked: "false" },
		{ name: 'Geruchssensitivität', id:12, checked: "false" },
		{ name: 'Stimmungsschwankungen', id:13, checked: "false" } 
	];
  
	$scope.koerperliche = [
		{ name: 'Aufregung/Stress', id: 1, checked: "true" },
		{ name: 'Erholungsphase', id: 2, checked: "false" },
		{ name: 'Schlaf/Wach-Rhytmusänderung', id: 3, checked: "false" },
		{ name: 'unregelmäßige Mahlzeiten', id: 4, checked: "false" },
		{ name: 'Menstruation', id: 5, checked: "false" },
		{ name: 'Sport', id: 6, checked: "false" },
		{ name: 'Wettereinflüsse', id: 7, checked: "false" },
		{ name: 'Unfall', id: 8, checked: "false" },
		{ name: 'Lärm, Licht, Gerüche', id: 9, checked: "false" },
		{ name: 'Flüssigkeitsmangel', id: 10, checked: "false" }
		
	];
  
	$scope.nahrungsmitteln = [
		{ name: 'Käse', id: 1, checked: "true" },
		{ name: 'Alkoholische Getränke', id: 2, checked: "false" },
		{ name: 'Schokolade', id: 3, checked: "false" },
		{ name: 'Kaffee, Cola', id: 4, checked: "false" },
		{ name: 'Medikamente', id: 5, checked: "false" }
	];
	
	$scope.tablettenart = [
		{name: 'Tablette', id: 1 },
		{name: 'Tropfen', id: 2 },
		{name: 'Zäpfchen', id: 3 }
	];
	
	$scope.tablettendosirung = [
		{name: '1x1/2', id: 1 },
		{name: '2x1/2', id: 2 },
		{name: '3x1/2', id: 3 },
		{name: '4x1/2', id: 4 },
		{name: '1x1', id: 5 },
		{name: '1x2', id: 6 },
		{name: '1x3', id: 7 },
		{name: '1x4', id: 8 },
		{name: '2x1', id: 9 },
		{name: '2x2', id: 10 },
		{name: '2x3', id: 11 },
		{name: '2x4', id: 12 }
	];

	$scope.tablettenauswirkung = [
		{name: 'Ja', id: 1 },
		{name: 'Nein', id: 2 }
	];
	
	$scope.datum = $filter('date')(Date.now(), 'dd-MM-yyyy');
	
	$scope.schmerzdauer = $filter('date')('h:mm');
	
	$scope.schmerzstaerke = 1;

	//$scope.medikament = 'Paracetamol';
	
	$scope.phoneno = "0123456789";
	
	$scope.verlaufsdatum = $filter('date')(Date.now(), 'dd-MM-yyyy');
})

.controller('PopupCtrl',function($scope, $ionicPopup, $timeout) {

	// Triggered on a button click, or some other target
	$scope.showPopupW = function() {
	//$scope.data = {}

	// An elaborate, custom popup
		var myPopup = $ionicPopup.show({
			template: '<input type="date" ng-model="verlaufsdatum">',
			title: 'Bitte Wählen Sie das Datum aus',
			scope: $scope,
			buttons: [
			  { text: 'Cancel' },
			  {
				text: '<b>OK</b>',
				type: 'button-positive',
				onTap: function() {
					
				}
			  },
			]
		});
	};
	// Triggered on a button click, or some other target
	$scope.showPopupM = function() {
	//$scope.data = {}

	// An elaborate, custom popup
		var myPopup = $ionicPopup.show({
			template: '<input type="date" ng-model="verlaufsdatum">',
			title: 'Bitte wählen Sie das Datum aus',
			scope: $scope,
			buttons: [
			  { text: 'Cancel' },
			  {
				text: '<b>OK</b>',
				type: 'button-positive',
				onTap: function() {
					
				}
			  },
			]
		});
	};
	// Triggered on a button click, or some other target
	$scope.showPopupJ = function() {
	//$scope.data = {}

	// An elaborate, custom popup
		var myPopup = $ionicPopup.show({
			template: '<input type="date" ng-model="verlaufsdatum">',
			title: 'Bitte Wählen Sie das Datum aus',
			scope: $scope,
			buttons: [
			  { text: 'Cancel' },
			  {
				text: '<b>OK</b>',
				type: 'button-positive',
				onTap: function() {
				 
				}
			  },
			]
		});
	};
	// An alert dialog
	$scope.showAlert = function() {
		var alertPopup = $ionicPopup.alert({
			title: 'Die komplette Datenbank wird gelöscht!',
			template: 'Die Daten können nach dem Löschen nicht wiederherstellt werden!',
			scope: $scope,
			buttons: [
			  { text: 'Cancel' },
			  {
				text: '<b>OK</b>',
				type: 'button-positive',
				onTap: function(e) {
				 
				}
			  },
			]
		});
		alertPopup.then(function(res) {
		console.log('Sie haben die komplette datenbank gelöscht!');
		});
	};
	
	$scope.showPopupDB = function() {
	//$scope.data = {}

	// An elaborate, custom popup
		var myPopup = $ionicPopup.show({
			template: '<input type="date" ng-model="verlaufsdatum">',
			title: 'Bitte Wählen Sie das Datum aus',
			scope: $scope,
			buttons: [
			  { text: 'Cancel' },
			  {
				text: '<b>OK</b>',
				type: 'button-positive',
				onTap: function(e) {
					var alertPopup = $ionicPopup.alert({
						title: 'Die komplette Datenbank wird gelöscht!',
						template: 'Die Daten können nach dem Löschen nicht wiederherstellt werden!',
						scope: $scope,
						buttons: [
						  { text: 'Cancel' },
						  {
							text: '<b>OK</b>',
							type: 'button-positive',
							onTap: function(e) {
							 
							}
						  },
						]
					});
				}
			  },
			]
		});
	};
});


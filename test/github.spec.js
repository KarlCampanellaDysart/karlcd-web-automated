describe('github factory', function(){

	var github, $httpBackend;

	beforeEach(module('angularSiteApp'));
	beforeEach(inject(function($injector){

		//get the artists service off the angular global
		github = $injector.get('github');

		//angular provided service
		$httpBackend = $injector.get('$httpBackend');
		$httpBackend.whenGET('github/repos')
		.respond(200, [
		    { "owner": "1234", "name": 'repo1' },
		    { "owner": "1234", "name": 'repo2' }
		]);

		$httpBackend.whenGET('github/owner/repo/readme')
		.respond(200,'readme');
	}));

	it('getAllRepos() should just return all of the repos', function(){

		github.getAllRepos().then(function(data){

			expect(data.data).toEqual([
		    	{ "owner": "1234", "name": 'repo1' },
		    	{ "owner": "1234", "name": 'repo2' }
			]);
		});

		$httpBackend.flush();
	});

	it('getReadme() should just return readme text', function(){

		github.getReadme('owner','repo').then(function(data){

			expect(data.data).toEqual('readme');
		});

		$httpBackend.flush();
	});
});
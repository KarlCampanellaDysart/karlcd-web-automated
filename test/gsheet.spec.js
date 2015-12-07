describe('gsheet factory', function(){

	var gsheet, $httpBackend;

	beforeEach(module('angularSiteApp'));
	beforeEach(inject(function($injector){

		//get the artists service off the angular global
		gsheet = $injector.get('Gsheet');

		//angular provided service
		$httpBackend = $injector.get('$httpBackend');
		$httpBackend.whenGET('gsheet/posts')
		.respond(200, [
		    { title: 'title', content: 'some writing' }
		]);

		$httpBackend.whenGET('gsheet/courses')
		.respond(200, [
		    { name: 'algorithms', description: 'spring 2014' }
		]);

		$httpBackend.whenGET('gsheet/experience')
		.respond(200, [
		    { name: 'Summer job', points: [] }
		]);

		$httpBackend.whenGET('gsheet/hackathons')
		.respond(200, [
		    { name: 'LA hacks', description: 'a description' }
		]);

		$httpBackend.whenGET('gsheet/skills')
		.respond(200, [
		    { name: 'language', description: 'a description' }
		]);
		
	}));

	it('getAllPosts() should just return all of the blog posts with a title and content', function(){

		gsheet.getAllPosts().then(function(data){
			expect(data.data).toEqual([
		    	{ 'title': 'title', 'content': 'some writing' }
			]);
		});

		$httpBackend.flush();
	});

	it('getCourses() should just return all of the courses with a name and description', function(){

		gsheet.getCourses().then(function(data){
			expect(data.data).toEqual([
		    	{ name: 'algorithms', description: 'spring 2014' }
			]);
		});

		$httpBackend.flush();
	});

	it('getExperience() should just return all of the blog posts with a name and point array', function(){

		gsheet.getExperience().then(function(data){
			expect(data.data).toEqual([
		    	{ name: "Summer job", points: [] }
			]);
		});

		$httpBackend.flush();
	});

	it('getHackathons() should just return all of the blog posts with a name and description', function(){

		gsheet.getHackathons().then(function(data){
			expect(data.data).toEqual([
		    	{ name: 'LA hacks', description: 'a description' }
			]);
		});

		$httpBackend.flush();
	});

	it('getSkills() should just return all of the blog posts with a name and description', function(){

		gsheet.getSkills().then(function(data){
			expect(data.data).toEqual([
		    	{ name: 'language', description: 'a description' }
			]);
		});

		$httpBackend.flush();
	});
});
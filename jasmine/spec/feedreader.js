/* feedreader.js
*
* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application.
*/

/* We're placing all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready.
*/
$(function() {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
    * allFeeds variable has been defined and that it is not
    * empty.
    */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* a test that loops through each feed
    * in the allFeeds object and ensures it has a URL defined
    * and that the URL is not empty.
    */
    it('Every feed element has a "URL" defined', function() {
      for (let i=0; i < allFeeds.length; i++) {
        expect(allFeeds[i]['url']).toBeDefined();
        expect(allFeeds[0]['url'].length).toBeGreaterThan(0);
      }
    });

    /* a test that loops through each feed
    * in the allFeeds object and ensures it has a name defined
    * and that the name is not empty.
    */
    it('Every feed element has a "name" defined', function() {
      for (let i=0; i < allFeeds.length; i++) {
        expect(allFeeds[i]['name']).toBeDefined();
        expect(allFeeds[0]['name'].length).toBeGreaterThan(0);
      }
    });
  });


  /* a new test suite for "The menu" */
  describe('The menu', function() {
    /* a test that ensures the menu element is
    * hidden by default.
    */
    it('the menu element is hidden by default', function() {
      expect($("body")[0]).toHaveClass('menu-hidden');
    });
    /* a test that ensures the menu changes
    * visibility when the menu icon is clicked. This test
    * have two expectations: does the menu display when
    * clicked and does it hide when clicked again.
    */
    it('the menu changes visibility when the menu icon is clicked', function() {
      var body = $("body")[0];

      document.querySelector('.icon-list').click();
      expect(body.className).toBe('');

      document.querySelector('.icon-list').click();
      expect(body. className).toBe('menu-hidden');
    });
  });

  /* a new test suite for "Initial Entries" */
  describe('Initial Entries', function() {
    /* a test that ensures when the loadFeed
    * function is called and completes its work, there is at least
    * a single .entry element within the .feed container.
    * loadFeed() is asynchronous so this test will require
    * the use of Jasmine's beforeEach and asynchronous done() function.
    */
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });
    it('the loadFeed func. called and completes its work', function(done) {
      expect($('.feed')[0].getElementsByClassName('entry').length).toBeGreaterThan(0);
      done();
    });
  });
  /* a new test suite for "New Feed Selection" */
  describe('New Feed Selection', function() {
    /* a test that ensures when a new feed is loaded
    * by the loadFeed function that the content actually changes.
    * loadFeed() is asynchronous.
    */
    beforeEach(function(done) {
      loadFeed(1, function() {
        feedInnerText = $('.feed')[0].innerText;
        loadFeed(2, function() {
          done();
        });
      });
    });
    it('a new feed loaded by loadFeed func. that content actually changes', function(done) {
      expect($('.feed')[0].innerText === feedInnerText).not.toBe(true);
      done();
    });
  });
}());

Router.route('/', function(){
	this.render('searchFirst');
}),
Router.route('/finances', function(){
	this.render('money');
}),
Router.route('/bills', function(){
	this.render('committeeSearch');
}),
Router.route('/contact', function(){
	this.render('contact');
})

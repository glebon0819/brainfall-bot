const casper = require('casper').create();

var x = require('casper').selectXPath;

casper.userAgent('Mozilla/5.0 (Windows NT x.y; Win64; x64; rv:10.0) Gecko/20100101 Firefox/10.0');

if(casper.cli.has(0)){
	var arg = casper.cli.get(0);
	if(arg.indexOf('brainfall') !== -1){
		casper.start(arg);
		console.log(arg);
		
		
		casper.waitForSelector("li span.answer", function() {
			this.click(x('//li[3]/span[contains(@class, "answer")]'));
			this.capture('firstanswer.png');
			if(casper.exists('button.control-next')){
			   // selector doesn't exist
			   this.click(x('//button[contains(@class, "control-next")]'));
			}
			else {
				this.wait(3000);
			}
		});

		casper.then(function(){
			this.wait(2000);
			this.capture('final.png');
		});
	}
}
else {
	console.log("\n****** No argument supplied. ******\n");
}

casper.run();
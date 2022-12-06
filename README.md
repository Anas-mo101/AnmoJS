# AnmoJS

## Import AnmoJS
Add script tag in all project headers 

    <script src="https://cdn.jsdelivr.net/gh/Anas-mo101/AnmoJS@main/bundle/anmojs-bundle.js"></script>

## Initializing AnmoJS Project

    <script  type="module">
	    import  Frontpage  from  "./views/Frontpage/Frontpage.js";
	    
	    Anmo.setBreakPoints({mobile:  450, tablet:  850});
	    Anmo.setMainContainer("body");
	    Anmo.initApp(Frontpage);
	</script>

## First Page Build

in Frontpage.js, the basic code boilerplate is the following.

    export default class extends Anmo.AbstractView {
	    constructor() {
	       
	        this.setTitle("Demo Project");
	    }

	    getComponentHTML() {
	        try {		     
			return Anmo.BuildElement ({	//creates a new h1 element
				tag: 'h1',    
				style: {
				  'color': 'blue';	// styles elements using css
				},
				content: 'Hello World !',	// element's content
			});

	        } catch (error) {
	            return this.componentError(error);
	        }
	    }
    }

# truncateTxt
Free snippet of code to truncate and add ellipses to paragraph dynamically that works across browsers.

# Getting Started
1. Must have jQuery linked in your html.
2. Download and include `ellipses.js` in your source code.

# How To Use
1. HTML should have the following structure:

```
<div class="container">
    <div class="parawrap">
        <p class="para">Lorem ipsum dolor</p>
    </div>
</div>
```

2. Include the following script in you js file to allow ellipses to find the container and a fixed height for the container.

```
   $(window).on('load', function (){
     var container = $('.container');
     var maxContainerHeight = 250
     ellipses(container,maxContainerHeight);

   });
      
```

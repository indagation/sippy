#SIPPY
##(Somewhat Incremental Partial Points Yo)

###What is SIPPY?
Sippy is a problem type that was built for edX problems. (To be honest, it is really just a JSInput problem) 
The problem consists of a couple of mandatory javascript files. It uses require.js and jquery to make it easily extendible, and it use jsChannel to talk to edX.

###Use Cases
- Incremental Problem: The user is awarded a fraction of a point every time they get a question right. They are reset down to 0 every time they get a problem wrong. (See examples/chemistry)
- Adaptive Problem: The user is given increasingly difficult problems. If they get a problem right, then their score goes up by an increment and they will be presented a more difficult problem. If they get a problem wrong, then their score will go down and they will be presented an easier problem. (See examples/adaptive)

###How do I try it out?
1. Upload all of the files in the required folder to your edX course.
2. Upload the js files from one of the example folders to your edX course.
3. Create a problem component from the xml file in the example.

###How does it work?
The sippy.html file uploads all of the required files. You just specify the problem js as a parameter in the url of the JSInput problem.
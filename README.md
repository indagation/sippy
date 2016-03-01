# SIPPY
## (Somewhat Incremental Partial Points Yo)

### What is SIPPY?
Sippy is a problem type that was built for edX problems. (To be honest, it is really just a JSInput problem) 
The problem type consists of a couple of mandatory javascript files. It uses require.js and jquery to make it easily extendible, and it uses jsChannel to talk to edX.

### Use Cases
- Incremental Problem: The user is awarded a fraction of a point every time they get a question right. They are reset down to 0 every time they get a problem wrong. (See examples/chemistry)
- Adaptive Problem: The user is given increasingly difficult problems. If they get a problem right, then their score goes up by an increment and they will be presented a more difficult problem. If they get a problem wrong, then their score will go down and they will be presented an easier problem. (See examples/adaptive)

### How do I try it out?
1. Upload all of the files in the required folder to your edX course.
2. Upload the js files from one of the example folders to your edX course.
3. Create a problem component from the xml file in the example.
Or you can just enroll in my edge.edx.org course and check out the examples: https://edge.edx.org/courses/course-v1:MITx+S101+2T2016/about

### How does it work?
The sippy.html file uploads all of the required files. You just specify the problem js as a parameter in the url of the JSInput problem.

### How do I build my own problem?
You really only need to build one js file. The js file really just needs three functions:

- **resetProblem:** This function sets the state of the problem. It will get called every time you need a new problem. It takes the current state and grade. It will return the current state.
- **buildProblem:** This function gets called every time the problem needs to be displayed. That can be on a page load or a new problem. It takes the state and returns the state.
- **setGrade:** This problem doesn't actually grade, but it sets the answer, expected, and feedback. It takes state and returns state.
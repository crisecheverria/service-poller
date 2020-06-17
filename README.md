# My Implementation

I focus on the Frontend track of the assignment, I don't have experience working with Java, but I also made a couple of small adjustments to the backend server to enable CORS (sorry for this :)), you can delete it of course, but this was the only way for me to run both Backend & Frontend because of my lack of knowledge of Java.

Also, Nelly Jonsson told me to focus only on the Frontend Tracks and leave the Backend untouchable (sorry for the small change about CORS).

Frontend/Web track:
- We want full create/update/delete functionality for services

For this track, I only missed the /update functionality, and the reason for that is because it is not implemented in the Backend and because of lack of time to do it my self. But the logic for /post & /update from the frontend side is similar.

Frontend/Web track:
- The poller results are not automatically shown to the user (you have to reload the page to see results)

I solved this by adding a 3 seconds interval to Fetch data from the server every 3 seconds, I also added an SVG for that, like a countdown—so no need to refresh every time.

When you POST or DELETE a service, it will retrigger a re-render of the component.

Frontend/Web track:
- Make sure the UI is as user friendly and accessible as possible, both on desktop and touch devices

I used a lot of styling to make it look good in both small & more significant screens using Media Queries. I also tried to mimic the same KRY colors UI.

The last thing, it took me around 8 hours to complete the challenge. Mainly because I spend a couple of hours just trying to run the Backend with IntelliJ and Gradle, gladly one friend expert with Java gives me a couple of recommendations for that. And I was also thinking about the UI of the Frontend, and understanding how the Backend works.

# Code assignment

One of our developers built a simple service poller.
The service consists of a backend service written in Vert.x (https://vertx.io/) that keeps a list of services (defined by a URL), and periodically does a HTTP GET to each and saves the response ("OK" or "FAIL").

Unfortunately, the original developer din't finish the job, and it's now up to you to complete the thing.
There is a wishlist of features in two separate tracks - Please start with the front-end track and complete as many of those issues as you can. If you have time left, you can also have a look at the back-end track.

Frontend/Web track:
- We want full create/update/delete functionality for services
- The results from the poller are not automatically shown to the user (you have to reload the page to see results)
- Make sure the UI is as user friendly and accessible as possible, both on desktop as well as touch devices

Backend track
- Simultaneous writes sometimes causes strange behavior
- A user (with a different cookie/local storage) should not see the services added by another user

Spend maximum four hours working on this assignment - make sure to finish the issues you start.

Put the code in a git repo on GitHub and send us the link (niklas.holmqvist@kry.se) when you are done.

Good luck!

# Building
We recommend using IntelliJ.
In intelliJ, choose
```
New -> New from existing sources -> Import project from external model -> Gradle -> select "use gradle wrapper configuration"
```

You can also run gradle directly from the command line:
```
./gradlew clean run
```

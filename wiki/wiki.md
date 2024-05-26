to run the project you need to run the TCP server first.
you can do so with running the branch newLevel4 in the AdvancedTeam repository link:
https://github.com/itamar3188/AdvancedTeam
to run the server you must run the tcp part first.
you can do it with cmake commands like the pictures:
cmake -B build -S .
cmake --build build
./build/main
![run tcp 1.png](run%20tcp%201.png)
![run tcp 2.png](run%20tcp%202.png)
![run tcp 3.png](run%20tcp%203.png)
another way to run it is by using the version in the docker:

after you ran it, you need to run  the server itself. do it by the command "npm start"
![run web.png](run%20web.png)
sometimes, there's a problem with specific port. To solve the problem, go to directory config.
you will find there a single file named .env.local
![handle server.png](handle%20server.png)
like the picture, change the port to one that fit you. if the tcp server ran on a different machine, change
the tcp ip to the ip on said machine.
After you ran the server, "open localhost:<port>" on the net. in our case it will be localhost:8989
you are at the login site.
![log in web.png](log%20in%20web.png)
if you don't have a user, you can register to the site. push the button and you will be at the register form
![sign up web.png](sign%20up%20web.png)
once registered, go back to the login site. enter your info and if it doesn't exist you will receive
![incorrect user data.png](incorrect%20user%20data.png)
once you are at the feed you can do many things:
    - change the mode to light/dark
![dark mode web.png](dark%20mode%20web.png)
    -post something
![add post.png](add%20post.png)
![new post.png](new%20post.png)
    -send a comment or edit one
![add comment web.png](add%20comment%20web.png)
![edit comment web.png](edit%20comment%20web.png)
![edit comments web.png](edit%20comments%20web.png)
    -like posts you see
for your posts you mights see that you have spaciel options:
![post options web.png](post%20options%20web.png)
you can edit or delete existing posts
when you try to post or edit a post, the server will look for dangerous links
and only allow for good ones to be posted
![block new post bad link.png](block%20new%20post%20bad%20link.png)
![block edit post bad link.png](block%20edit%20post%20bad%20link.png)
in android you have other options pay attention that the server/tcp must be running also for it!
![sign up android.jpg](sign%20up%20android.jpg)
![sign up validation android.jpg](sign%20up%20validation%20android.jpg)
that how you register
![log in android.jpg](log%20in%20android.jpg)
once you login, you will see this
![feed android.jpg](feed%20android.jpg)
![feed android post.jpg](feed%20android%20post.jpg)
![posts android.jpg](posts%20android.jpg)
this is the feed and the posts, you can do everything there that you can in the web
another registration example android
![registration example android](https://github.com/yuvalbarak8/server/assets/75585109/3bfe1e35-e74a-4a15-9db3-b2e538fde7b8)
bad registration example android:
![bad registration example android](https://github.com/yuvalbarak8/server/assets/75585109/f19f3c60-b620-4fd7-8833-88f771236f1a)
post contain bad link in android:
![post contain bad link android](https://github.com/yuvalbarak8/server/assets/75585109/57a5e4f7-a557-465e-836e-d2610b3a0fa5)
invalid password android:
![invalid password android](https://github.com/yuvalbarak8/server/assets/75585109/0737b55c-88f0-4600-9240-fb6f9a0395d7)
edit post android
![edit post android](https://github.com/yuvalbarak8/server/assets/75585109/7c6f9a60-07a3-429d-b416-95af3ef6acef)
example that show post contain bad link android is blocked

![post contain bad link android](https://github.com/yuvalbarak8/server/assets/75585109/058477e9-1c06-4406-9a43-ad5a19fabf30)





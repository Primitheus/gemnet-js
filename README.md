# Gemnet
<u>Documentation of Rumble Fighter/Gem Fighter Packets and Network Functions.</u></br>

<strong>DISCLAIMER:</strong> This documentation is mostly for me and will NOT provide detailed support on achieving the same results. It will however contain some information which may not always be complete on what I am doing and how I am doing it, I am also planning to capture packets and organise them in such a way if the Rumble Fighter got shutdown, we have some documentation to possibly create a Private Server. If someone happens to stumble across this and thinks they can offer help, I encourage you to get in touch with me and discuss this. Discord: Primitheus#6431.</br>

Rumble Fighter uses XOR Encryption for the packets. The XOR key generation is yet to be fully understood, however I have reversed a good chunk of it. The method used is the same for both Rumble Fighter and Gem Fighter.

Rumble Fighter connects to two servers, port 7000 and port 33343. 7000 Is the main server which takes care of everything from inventory to chat. 33343 Is the p2p server. 


What does this mean? </br>
It means I can see the packets the game sends in unencrypted format and also edit the packet as it is being encrypted before it is sent to the server and therefore yield interesting results. However this is not a perfect packet editor, it is a hacky way of editing and depending on how it is used could be very powerful or not so much.

What is the goal of this? </br>
To be honest, it's mostly for education. Reverse Engineering is a hobby of mine and Rumble Fighter was a childhood game. The end game would be to create a Packet Editor or even a Private Server for newer and older versions of the game purely for education. 

<strong>Gemnet.exe</strong> </br>
This is a VERY early build of a theoretical Private Server. To use you have to reroute the Rumble Fighter IP back to your localhost (127.0.0.1), if you can't do this you're probably not going to benefit or understand this repo. It will crash upon trying to go to 
Lobby, My Info, Training, etc as I have yet to implement them and currently too lazy. But it will fully launch the game.
Source code of Gemnet.exe has been partically lost, the barebones of the source code still exists, but I won't share that until it is more practical and cleaner.

<strong>Proxy.js</strong> </br>
This is a proxy to observe the (unencrypted) packets in realtime.
TODO: Packet Replay, Packet Descriptions.

<strong>Server.js </strong> </br>
New Private Server build entirely in nodejs, this is very poorly made and lacks quality, but it proves a Private Server is possible. 
TODO: Rewrite this in C++ using Asio Boost. Integrate my PS to 33343






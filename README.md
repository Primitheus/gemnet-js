# Gemnet
<u>Documentation of Rumble Fighter/Gem Fighter Packets and Network Functions.</u></br>

<strong>DISCLAIMER:</strong> This documentation is mostly for me and will NOT provide detailed support on achieving the same results. It will however contain some information which may not always be complete on what I am doing and how I am doing it, I am also planning to capture packets and organise them in such a way if the Rumble Fighter got shutdown, we have some documentation to possibly create a Private Server. If someone happens to stumble across this and thinks they can offer help, I encourage you to get in touch with me and discuss this. Discord: Primitheus#6431.</br>

Rumble Fighter uses XOR Encryption for the packets. The XOR key generation is yet to be fully understood, however I have reversed a good chunk of it. The method used is the same for both Rumble Fighter and Gem Fighter.


What does this mean? </br>
It means I can see the packets the game sends in unencrypted format and also edit the packet as it is being encrypted before it is sent to the server and therefore yield interesting results. However this is not a perfect packet editor, it is a hacky way of editing and depending on how it is used could be very powerful or not so much.
I still wonder why I need your email to gift items... ;) No seriously that's not a good practise of keeping user information secure.



What is the goal of this? </br>
To be honest, it's mostly for education. Reverse Engineering is a hobby of mine and Rumble Fighter was once a very huge interest, so, why not combine the two and mess with it. The end game would be to create a Packet Editor or even a Private Server for newer and older versions of the game purely for education and a bit of fun without any intention of monetization. 

<strong>Gemnet.exe</strong> </br>
This is a VERY early build of a theoretical Private Server. To use you have to reroute the Rumble Fighter IP back to your localhost (127.0.0.1), if you can't do this you're probably not going to benefit or understand this repo. It will crash upon trying to go to 
Lobby, My Info, Training, etc as I have yet to implement them and currently too lazy. But it will fully launch the game.
Source code of Gemnet.exe has been partically lost, the barebones of the source code still exists, but I won't share that until it is more practical and cleaner.




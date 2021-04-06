# Snaip
## A simple demonstration of a Neural Network's impression of our photos

So here's the idea: complex neural networks like the ones developed at google to generate deep dream images are very cool. But for those of us who want to believe that we're NN experts, but wake up in cold sweats about the idea of *writing* an actual AI of our own without copy-&-pasting from the docs, there's got to be a simpler place to start.

This is why I'm drawn to RBM's, or *Restricted-Boltzmann Machines.* These NN's consist simply of a visible and hidden layer. The purpose of the hidden layer, in my very basic understanding, is to form an impression of the different images it's shown.

Then, when the RBM has been show enough pictures, one can feed an image (or other datatype) into the input layer, and retrieve the hidden layers estimate of what that image is supposed to look like.

Sound confusing? Think of it this way: when we dream we don't see things **exactly** as they are in reality, just our impression of that thing. The abstraction in dreams is obviously quite complex. It involves our emotional ties, biases, the way farting in public made you feel last Tuesday. 

LOTS of factors at play, so lets dumb it down to just the visuals.

Imagine that at the end of a long day you plop down on the couch, turn on the TV and start watching something dumb. And of course, before that dumb show can come on, you see three advertisements. One of them is a plea for donations to save some very cute but very sad looking dogs. The second is a commercial for the newest action-drama-romance disaster of a show about firefighters, and the last commercial is for toothpaste.

In the wacky world of dream land, it's not too far fetched to say that when that bag of potato chips you just destroyed hits, you're going to be out like a light, and you'll likely be dreaming away about humanoid dogs who work as firefighters and put out said fires with toothpaste. Also part of the romantic drama is them peeing on the fire hydrants to mark their turf because why not, it's a dream. 

**dreams are weirds, so lets bring that weird to life**

## The Technical Bits

An RBM is just a hidden layer that learns to match the input to it's closest impression of the image. In this way it works much like a classifier, except instead of providing a percent certainty of an output, it simply provides the closes fitting 'understanding' it has of 'what that image is supposed to be'. 

If you train an RBM on the MNIST data set, then provide it an MNIST 9, it will return (to the input layer) an array of pixels that essentially return a label as a learned image.

So what if there was an API and simple, user profile based, image capture website that let users take pictures to train their neural network, then take a single picture and 'regenerate' it with the RMB they trained.

Future implementations should have tagging, sharing and feed capabilities, but for now it's just a login and try it type idea


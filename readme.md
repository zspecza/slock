![build status](https://img.shields.io/travis/declandewet/slack-frp.svg?style=flat-square)
![test coverage](https://img.shields.io/coveralls/declandewet/slack-frp.svg?style=flat-square)
![dependency status](https://img.shields.io/david/declandewet/slack-frp.svg?style=flat-square)
![dev dependency status](https://img.shields.io/david/dev/declandewet/slack-frp.svg?style=flat-square)
![npm downloads](https://img.shields.io/npm/dm/slack-frp.svg?style=flat-square)
![npm version](https://img.shields.io/npm/v/slack-frp.svg?style=flat-square)
![npm license](https://img.shields.io/npm/l/slack-frp.svg?style=flat-square)

SlackFRP
---------

> **Note** this module is in _extremely_ early development. There are no
> tests yet, documentation is missing and
> [versioning might be a little different](http://markup.im/#q4_cRZ1Q).
> So don't use this in production at the moment - but feel free to play with it!

SlackFRP is a Node.js module for working with the various Slack APIs, built atop
functional reactive programming principles.

The benefit of using functional reactive programming for such
a library means that events can be `filter`ed, `map`ped, `reduce`ed,
and so on - just like arrays!

Functional Reactive code can also be very expressive while still remaining
terse, and this makes maintainability an absolute dream.

Installation
============

SlackFRP can be installed by executing the following command in a terminal:

```
npm install slack-frp --save
```

Usage
==========

SlackFRP tries to be as inexplicit as possible, and as such doesn't require
much of a learning curve (even if functional reactive programming, observables
and EventStreams are not quite your strong point).

Every event and method correlates directly to the events and methods listed
on the Slack API documentation site, so if those docs expect a payload,
just call the relevant method with the expected payload as a regular JS object.

Let's get started building a realtime bot that echoes out what users say.

First thing's first - we have to connect to the Slack API by passing in
our bot's API token.

```js
// import the module
var Slack = require('slack-frp');

// give it our token
var slack = new Slack('insert api token here');
```

That was pretty simple and straightforward - but now we need to connect to
the RTM API. Simple enough:

```js
slack.connect();
```

Boom. How's about we post a message to Slack letting users know we've connected?

```js
slack.connect()
  .onValue(function(response) {
    slack.chat.postMessage({
      text: "Hello! I'm now active on your team.",
      channel: "#general"
    });
  });
```

Now, for the logic that echoes out what users say...

```js
slack.events.message
  .filter(function(message) {
    return ~message.text.indexOf('bot echo');
  })
  .onValue(function(message) {
    var echo = message.text.split('bot echo ')[1];
    slack.chat.postMessage({
      text: echo,
      channel: message.channel
    })
  });
```

Putting it all together, we have something that looks like this:

```js
// import the module
var Slack = require('slack-frp');

// give it our token
var slack = new Slack('insert api token here');

slack.events.message
  .filter(function(message) {
    return ~message.text.indexOf('bot echo');
  })
  .onValue(function(message) {
    var echo = message.text.split('bot echo ')[1];
    slack.chat.postMessage({
      text: echo,
      channel: message.channel
    })
  });

slack.connect()
  .onValue(function(response) {
    slack.chat.postMessage({
      text: "Hello! I'm now active on your team.",
      channel: "#general"
    });
  });
```

As you can see, the methods are fairly straightforward.

Any time you want to get access to a Slack RTM event, just
call `slack.events.<event type>`.
[Here's a list of all of them](https://api.slack.com/rtm).

Similarly, if you want to use a particular Slack Web API method, just
call `slack.<name of method group>.<name of method>`, so if you
wanted to post a message, it'd be `slack.chat.postMessage`. If you
want to add a reaction, call `slack.reactions.add`.
[Here's a list of all the methods](https://api.slack.com/methods) you can call.


Simple, yet flexible notifications for **Angular2 or greater**.
Why yet another notification library?
I found them either too complex or too simplistic and strive for a good balance here.
Additionally, it fits in well with Angular Material Design,
but is still independent from the material design library!


## Demo

![notify-angular library demo](http://notify.tsmean.com/notify-angular2.gif)


**Live Demo: http://notify.tsmean.com/**


## Installation

```
npm install notify-angular
```

Import in your app.module:
```
imports: [NotifyModule]
```

Put this in your root component's html:

```
<notify></notify>
```


## Usage

Inject NotifyService:

```
constructor (
  private notify: NotifyService
) {}
...
```

and use like this:

```
notify.success('cool beans');
```

or like this:
```
notify.error('not cool beans', {
  withShadow: false,
  color: green,
  background: red,
  timer: 500,
  position: {
    top: 0;
    right: 0;
  }
}
```

## Comments

Semver is strictly followed. Now have fun with the library!

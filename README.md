# chloi.io

Our website.

It’s built with ours and others’ open source projects, including:

- [Harp](http://github.com/sintaxi/harp)
- [Straight Up](https://github.com/kennethormandy/straight-up)
- [Normalize-OpenType.css](https://github.com/kennethormandy/normalize-opentype.css)

![](preview.png)

## Getting started

To run the project locally, run the following commands:

```bash
# Install Harp
npm install -g harp

# Clone the repository
git clone https://github.com/chloi/chloi.io

# Serve the project folder with Harp
harp server chloi.io/

# Open your browser
open http://localhost:9000
```

## Deploying

We are currently using an unconventional method of deploying to the Harp Platform. You’ll need to have access to the project on the Harp Platform and the Dropbox shared with you to deploy. Follow the [Running locally](#running-locally) instructions, and then:

```bash
# Compile to your Dropbox
npm run deploy
```

Now, just press Publish on the chloi.io project on the [Harp Platform](http://harp.io).

## License

Copyright © 2012–2014 [Chloi Inc.](http://chloi.io)

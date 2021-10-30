# Transpyr

The Transpyr front-end is a React application with access to all of Transpyr's user, event, and booking features in the browser.

[**Live app**](https://transpyr.app)

## Features
---

- Browsing, searching, and booking events in a user's area or online without creating an account.
- User account creation and management: Changing names, password, and favorite events privacy.
- Reset password functionality for forgotten passwords.
- Public user profile customization: User photo, bio, interests, and favorite events.
- Detailed event creation, supporting online and in-person events and unlimited custom ticket types. Markdown editor for event descriptions.
- Options to supply a personal refund policy and choose between covering the service fee or passing it to attendees.
- 'My Bookings' displays signed-in user's upcoming booked events on a calendar. Booking management allows for cancellation and refund requests.
- 'My Events' shows an organizer's upcoming events on a calendar. Event management shows number of bookings for each ticket, estimated earnings, and the ability to cancel specific tickets or the entire event.

## Technologies
---

The app is built with **JavaScript** and the [**React**](https://reactjs.org) framework. The project was bootstrapped with [**Create React App**](https://create-react-app.dev). It uses stylesheets compiled from [**SCSS**](https://sass-lang.com).

Large libraries in the React ecosystem used:
- [**React**](https://npmjs.com/package/react)
- [**React DOM**](https://npmjs.com/package/react-dom)
- [**React Router**](https://npmjs.com/package/react-router-dom)

Other libraries used:
- [**Axios**](https://www.npmjs.com/package/axios) for fetching
- [**React Bootstrap**]() for assorted UI components
- [**date-fns**]() for date processing
- [**yup**]() for input validation
 

## Installation
---

### **Environment Variables**
- **REACT_APP_GOOGLE_MAPS_APIKEY**:
  - API key for the Google Maps JavaScript API
- **REACT_APP_BACKEND_HOST**:
  - The host running transpyr-api.
  - In development, this is set to localhost:3000

### **Starting the development server**

  - **npm start** starts the development server on localhost:3001

## Credits
---

Icons from [**Ionicons 5**](https://react-icons.github.io/react-icons/icons?name=io5)

Additional React components:
- [**react-calendar**](https://github.com/zackify/react-calendar)
- [**google-maps-react**](https://github.com/fullstackreact/google-maps-react)
- [**react-currency-input-field**](https://github.com/cchanxzy/react-currency-input-field)
- [**react-infinite-scroller**](https://github.com/danbovey/react-infinite-scroller)
- [**react-mde**](https://github.com/andrerpena/react-mde)

## License
---

MIT License

Copyright (c) 2021 Stephen Welbourn

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
Ecosphere - Nearby Chat Web App

Ecosphere is a web application that allows users to chat with people within a 1 km radius around them. Built with Next.js, this app leverages geolocation and WebSocket technology to create an interactive and dynamic experience for users to connect with others nearby in real-time.


---

🚀 Features

Real-time Chat: Connect instantly with people near you and start chatting in real time.

Proximity-Based Matching: Users can only interact with others within a 1 km radius for privacy and location-based relevance.

User-Friendly Interface: Simple and clean UI built with Next.js for seamless interaction.

Geolocation Support: The app uses the browser’s geolocation API to fetch the user’s current position, ensuring chats are limited to a specific radius.

Lightweight & Fast: Built with modern technologies to ensure optimal performance, even with real-time messaging.



---

🌍 Technologies Used

Frontend: Next.js (React framework)

Backend: WebSockets for real-time messaging

Geolocation API: Used to determine the user’s current location and calculate the 1 km proximity.

Styling: CSS/SCSS for styling the user interface

Deployment: (Include deployment details, such as Vercel, Netlify, or custom server, if any)



---

💻 Getting Started

1. Clone the repository
Run the following command to clone the repository to your local machine:

git clone https://github.com/theadhithyankr/Ecosphere-NearbyChat.git


2. Install dependencies
Navigate into the project directory and install the required dependencies:

cd Ecosphere-NearbyChat
npm install


3. Run the app locally
To run the app in development mode:

npm run dev

Visit http://localhost:3000 in your browser to interact with the app.


4. Deploy the app
If you wish to deploy the app, consider using platforms like Vercel or Netlify for fast and easy deployment with Next.js.




---

📐 App Architecture

Frontend: The user interface is built with Next.js and React, allowing for smooth user interactions.

WebSocket Integration: The app uses WebSockets to handle real-time messaging. When a user sends a message, it’s instantly broadcasted to others in the 1 km radius.

Geolocation: The app relies on the HTML5 Geolocation API to fetch the user’s current location. This ensures that only users within 1 km can interact with each other.



---

📈 Future Improvements

Authentication: Implement user authentication to personalize user profiles and allow them to come back to their conversations.

Location-based Features: Add features like location-based content sharing, friend requests, and user status updates.

Scalability: Scale the app for larger radius chats (e.g., 5 km, 10 km) or allow for virtual communities based on interests.

Mobile App: Create a mobile version of the app for both Android and iOS.



---

🔧 Contributing

1. Fork the repository


2. Create your feature branch (git checkout -b feature/new-feature)


3. Commit your changes (git commit -am 'Add new feature')


4. Push to the branch (git push origin feature/new-feature)


5. Create a new Pull Request




---

📄 License

Distributed under the MIT License. See LICENSE for more information.


---

📢 Acknowledgements

Next.js: For powering the frontend of the app.

WebSockets: For enabling real-time communication.

HTML5 Geolocation API: For determining users' location.

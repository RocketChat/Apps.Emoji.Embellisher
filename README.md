<div align="center">
  <img width=30% src="https://github.com/user-attachments/assets/a92f27b9-5101-4725-8311-a0e6ada0edc7" alt="chat-summarizer-illustration">
</div>

<h1 align="center">AI Emoji Embellisher App</h1>

<p align="justify">
  A Rocket.Chat app that leverages open-source large language models - LLMs (Mistral, Llama, Phi, Gemma and so on) to turn boring old-school text messages into sensitive modern emojified texts. User can copy, edit, redo, or send the embellished text messages.
</p>

<p align="center">
  <a href="https://github.com/RocketChat/Apps.Emoji.Embellisher/wiki#-----embellisher-app-demo">View Demo</a>
  ·
  <a href="https://github.com/RocketChat/Apps.Emoji.Embellisher/issues">Request Feature</a>
  ·
  <a href="https://github.com/RocketChat/Apps.Emoji.Embellisher/issues/new">Report Bug</a>
</p>

<div align="center">
  
  [![Contributors][contributors-shield]][contributors-url] 
  [![Forks][forks-shield]][forks-url]
  [![Stargazers][stars-shield]][stars-url]
  [![Issues][issues-shield]][issues-url]
  [![MIT License][license-shield]][license-url]

</div>

## 📘 Getting Started

<div align="justify">
  
**Setting up a Rocket.Chat server**
- To set up your Rocket.Chat server manually, follow these steps: [Local Development](https://github.com/RocketChat/Rocket.Chat?tab=readme-ov-file#%EF%B8%8F-local-development).
- To set it up using Docker, download the following `compose.yml` file: [Docker Image](https://github.com/RocketChat/Docker.Official.Image/blob/fb09fece013b05ce7c0d8a42b646543a75fda57a/compose.yml). Then, navigate to the directory where the file was downloaded and run the following command:
    ```sh
    docker compose up -d
    ```
    **Note:** If you encounter errors with `docker compose` while using an Apple Silicon device, follow the solution mentioned here: [Issues](https://github.com/RocketChat/Docker.Official.Image/issues/204).

**Apps Engine for Rocket.Chat**
- Get started with the Apps-Engine to develop your own apps that can be integrated with your Rocket.Chat server.
- Follow the docs to explore the wide range of integration possibilities within the Rocket.Chat ecosystem: [Apps-Engine framework](https://developer.rocket.chat/docs/getting-started-with-apps-engine).
- To install the Apps-Engine CLI, run the following command:
    ```sh
    npm install -g @rocket.chat/apps-cli
    ``` 
</div>

## ⚙️ Installation
**First, ensure that you have set up a Rocket.Chat server by following the instructions in the [Getting Started](#-getting-started) section above.**

1. Fork the repository, then clone the forked repository under your username to your local system:
    ```sh
    git clone https://github.com/<your-username>/Apps.Emoji.Embellisher
    ```
    
2. Install app dependencies:
    ```sh
    cd embellisher && npm install
    ```

3. Deploy the app to your server:
   ```sh
   rc-apps deploy --url <url> --username <username> --password <password>
   ```
   
<p align="justify">
  Once deployed, users have the flexibility to set their preferences for using different app features. They can navigate to <strong>"Installed Apps" -> "Private Apps,"</strong> and under <strong>"Settings"</strong> provide their own <code>LLM API url</code>, <code>key</code>, and <code>model name</code>, or stick with the in-house LLM model. Additionally, they can switch between embellishment use cases in this section.
</p>

## ✅ Project Overview
<p align="justify">
  Text embellishment is a natural language generation problem that aims to enhance the lexical and syntactic complexity of a text while retaining the same semantic information and meaning. This is often achieved by incorporating emojis, punctuation, and additional details to make the text more interesting and engaging. This project delves into the Embellisher App for Rocket.Chat. This app will enable users to generate emojified / embellished text messages from plain text messages they enter in the message box using open-source LLMs. Upon generation, the user will be notified with an interactive message that only the sender can see. Using the interactive action button, the user can copy, edit, redo, or send the embellished text message. Read this <a href="https://github.com/RocketChat/Apps.Emoji.Embellisher/wiki">wiki</a> to know more about this project.
</p>

## 🚀 Usage
```

  👋 Need some help with /embellish?

    • use `/embellish <user input>` to emojify and embellish your text messages 📝
    • use `/embellish model` to provide the current model being used by the app 💻
    • use `/embellish help` to list the essential subcommands of the app 🤔

```

## 🧑‍💻 Contributing
<p align="justify">
  Contributions make the open-source community an incredible place to learn, inspire, and create, and any you make are <strong>greatly appreciated</strong>. If you have suggestions for improvement, please fork the repo, create a pull request, or simply open an issue. And don't forget to give the project a star—thanks again!
</p>

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feat/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: adds some amazing feature'`)
4. Push to the Branch (`git push origin feat/AmazingFeature`)
5. Open a Pull Request

## 📚 Resources
Some links to examples and documentation:
- [Rocket.Chat Apps TypeScript Definitions Documentation](https://rocketchat.github.io/Rocket.Chat.Apps-engine/)
- [Rocket.Chat Apps TypeScript Definitions Repository](https://github.com/RocketChat/Rocket.Chat.Apps-engine)
- [Example Rocket.Chat Apps](https://github.com/graywolf336/RocketChatApps)
- [#rocketchat-apps on Open.Rocket.Chat](https://open.rocket.chat/channel/rocketchat-apps)
- Community Forums
  - [App Requests](https://forums.rocket.chat/c/rocket-chat-apps/requests)
  - [App Guides](https://forums.rocket.chat/c/rocket-chat-apps/guides)
  - [Top View of Both Categories](https://forums.rocket.chat/c/rocket-chat-apps)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/RocketChat/Apps.Emoji.Embellisher?style=for-the-badge
[contributors-url]: https://github.com/RocketChat/Apps.Emoji.Embellisher/graphs/contributors

[forks-shield]: https://img.shields.io/github/forks/RocketChat/Apps.Emoji.Embellisher?style=for-the-badge
[forks-url]: https://github.com/RocketChat/Apps.Emoji.Embellisher/network/members

[stars-shield]: https://img.shields.io/github/stars/RocketChat/Apps.Emoji.Embellisher?style=for-the-badge
[stars-url]: https://github.com/RocketChat/Apps.Emoji.Embellisher/stargazers

[issues-shield]: https://img.shields.io/github/issues/RocketChat/Apps.Emoji.Embellisher?style=for-the-badge
[issues-url]: https://github.com/RocketChat/Apps.Emoji.Embellisher/issues

[license-shield]: https://img.shields.io/github/license/RocketChat/Apps.Emoji.Embellisher?style=for-the-badge
[license-url]: https://github.com/RocketChat/Apps.Emoji.Embellisher/blob/main/LICENSE

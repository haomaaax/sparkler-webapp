import Head from "next/head";
import Image from "next/image";
import buildspaceLogo from "../assets/buildspace-logo.png";
import twitterLogo from "../assets/twitter-logo.png";
import { useState } from "react";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [apiOutput, setApiOutput] = useState("");

  const [comicInput, setComicInput] = useState([])
  const [comicOutput, setComicOutput] = useState([])

  const [isGenerating, setIsGenerating] = useState(false);

  console.log('comicInput', comicInput)
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    setComicInput(`${output.text}`.split('.').filter(item => item!=""))
    setIsGenerating(false);
  };

  const callGenerateComicEndpoint = async () => {
    console.log('callGenerateComicEndpoint')
    setIsGenerating(true);
    Promise.all(comicInput.map(item => {
      //call api
      // await api()
      //return api()
    }))
    .then(values => {
      setComicOutput(values)
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {
      setIsGenerating(false)
    })
  };

  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>Sparkler 🎇</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Create your own comic</h1>
          </div>
          <div className="header-subtitle">
            <h2>Step 1: Enter anything you want to show up in storyline</h2>
          </div>
        </div>
        {/* Add prompt text box here */}
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="Something like a hero with legendary sword or mysterious dragons in dark dungeon"
            value={userInput}
            onChange={onUserChangedText}
          />
          {/* Add button here */}
          <div className="prompt-buttons">
            <a
              className={
                isGenerating ? "generate-button loading" : "generate-button"
              }
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? (
                  <span className="loader"></span>
                ) : (
                  <p>Generate</p>
                )}
              </div>
            </a>
          </div>
          {/* New code I added here */}
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Here's your story :D</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
              <div className="prompt-buttons">
                <a
                  className={isGenerating ? 'generate-button loading' : 'generate-button'}
                  onClick={callGenerateComicEndpoint}
                >
                  <div className="generate">
                    {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
                  </div>
                </a>
              </div>
              <div>
                <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-size="large" data-text="I&#39;m generating my comic storyline with @sparklerclub 🎇 Try it here:" data-url="https://sparkler-webapp-production.up.railway.app/" data-related="haomaaax" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
              </div>
            </div>
          )}
          {
            comicOutput.length > 0 && (
              comicOutput.map((item, key) => {
                <img key={key} src={item} />
              })
            )
          }
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
      <div className="badge-container-right grow">
        <a href="https://twitter.com/haomaaax" target="_blank" rel="noreferrer">
          <div className="badge">
            <Image src={twitterLogo} alt="twitter logo" />
            <p>built by maaax</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;

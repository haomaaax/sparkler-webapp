import Head from "next/head";
// import Image from 'next/image'

import Header from "../components/header";
import Step from "../components/step";
import GenerateButton from "../components/generateButton";
import ShareTweet from "../components/shareTweet";
import FooterBadge from '../components/footerBadge'

import { useState, useCallback, memo, useMemo } from "react";

const callApi = async (path, params) => {
  const response = await fetch(path, params)
  const data = await response.json()
  const { output } = data
  return output
}
const RenderStory = (({storyOutput}) => {
  console.log('renderStory', storyOutput)
  return storyOutput && (
    <div className="output">
      <div className="output-header-container">
        <div className="output-header">
          <h3>🪄 Your story ✨</h3>
        </div>
      </div>
      <div className="output-content">
        <p>{storyOutput}</p>
      </div>
    </div>
  )
})

const RenderComic = (({comicOutput}) => {
  console.log('renderComic', comicOutput)
  const hasResult = comicOutput.length > 0 && comicOutput.every(comic => !!comic?.url)
  return (
    <>
    <div className="output-header">
      <h3>🪄 Your graphics ✨</h3>
    </div>
      {
        hasResult && comicOutput.map((comic, key) => {
          return <img key={key} src={comic.url} width="50%" />
        })
      }
    </>
  )
})

const Home = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [userInput, setUserInput] = useState("");
  const [storyOutput, setStoryOutput] = useState("")
  const [comicOutput, setComicOutput] = useState([])

  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateStoryEndpoint = useCallback(async () => {
    console.log('callGenerateStoryEndpoint')
    setIsGenerating(true);
    setStoryOutput('');
    setComicOutput([]);
    try {
      const response = await callApi("/api/generate/sentence", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      });
      console.log("callGenerateStoryEndpoint response", response.text);
      setCurrentStep(1)
      setStoryOutput(`${response.text}`);
      setIsGenerating(false);
    }
    catch(error){
      console.log(error)
      setIsGenerating(false)
    }
  },[userInput]);

  const callGenerateComicEndpoint = useCallback(() => {
    // const comicInput = `${storyOutput}`.split('.').filter(item => item!="")
    const comicInput = `${storyOutput}`.split('Subtitle')[1].split('*').filter(item => item!="")
    console.log('callGenerateComicEndpoint', comicInput)
    setIsGenerating(true);
    Promise.all(comicInput.map(item => {
      return callApi("/api/generate/comic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput: item }),
      });  
    }))
    .then(responses => {
      console.log('callGenerateComicEndpoint responses', responses)
      setCurrentStep(2)
      setComicOutput(responses)
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {
      setIsGenerating(false)
    })
  },[storyOutput]);

  const onUserChangedText = useCallback((event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  },[]);

  return (
    <div className="root">
      <Head>
        <title>Sparkler</title>
      </Head>
      <div className="container">
        <Header />
        {
          currentStep >= 0 && (
            <div className="prompt-container">
              <Step text={'Step 1: Enter any text you want to appear in the storyline.'} />
              <textarea
                className="prompt-box"
                placeholder="If you don't enter any elements, we'll provide you with a random storyline."
                value={userInput}
                onChange={onUserChangedText}
              />
              <GenerateButton isGenerating={isGenerating} onClick={callGenerateStoryEndpoint} />
              <RenderStory storyOutput={storyOutput} />
            </div>
          ) 
        }
        {
          currentStep >= 1 && (
            <div className="prompt-container">
              <Step text={'Step 2: Click the Generate button to see the cool graphics that are generated based on your storyline.'} />
              <GenerateButton isGenerating={isGenerating} onClick={callGenerateComicEndpoint} />
              <RenderComic comicOutput={comicOutput} />
            </div>
          )
        }
        {
          currentStep >= 2 && (
            <div className="prompt-container">
              <Step text={'Step 3: Congratulations! Share your creations with the world!'} /> 
              <ShareTweet />
            </div>
          )
        }
      </div>
      <FooterBadge />
    </div>
  );
};

export default Home;

"use client";

import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bike,
  Sun,
  Cloud,
  CloudRain,
  Thermometer,
  Coffee,
  Mountain,
  Users,
  PaintbrushIcon as PaintBrush,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Activity,
  findMatchingActivities,
  getRandomActivity,
} from "./utils/activity-matcher";

/* ───────────── local types ───────────── */
type TimeOfDay = "Early Bird" | "Daytime" | "Evening" | "Night";
type Weather =
  | "Sunny & Warm"
  | "Cool & Breezy"
  | "Rainy Day"
  | "Really f*kin hot"
  | "Perfect Davis Evening";
type Budget = "Broke asf" | "A few dollars" | "Treat myself " | "Down to spend";
type Mood = "Chill" | "Adventurous" | "Social" | "Creative";

type View = "landing" | "input" | "loading" | "suggestion" | "share";

/* ───────────── main component ───────────── */
export default function Home() {
  const [view, setView] = useState<View>("landing");
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("Daytime");
  const [weather, setWeather] = useState<Weather>("Sunny & Warm");
  const [budget, setBudget] = useState<Budget>("Broke asf");
  const [mood, setMood] = useState<Mood>("Chill");
  const [activity, setActivity] = useState<Activity | null>(null);

  /* generator that now respects filters */
  const generateActivity = () => {
    setView("loading");

    setTimeout(() => {
      const matches = findMatchingActivities(timeOfDay, weather, budget, mood, {
        outdoor: 3,
        social: 4,
        active: 2,
        creative: 1,
      });

      const pick = getRandomActivity(matches) ?? {
        text: "Nothing fit perfectly—tweak a filter and try again.",
        location: "Anywhere in Davis",
        duration: "-",
        emoji: "🤔",
        timeOfDay: [],
        weather: [],
        budget: [],
        mood: [],
        weight: 0,
      };

      setActivity(pick);
      setView("suggestion");
    }, 800);
  };

  const shareActivity = () => setView("share");

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {view === "landing" && <LandingView onStart={() => setView("input")} />}

        {view === "input" && (
          <InputView
            timeOfDay={timeOfDay}
            setTimeOfDay={setTimeOfDay}
            weather={weather}
            setWeather={setWeather}
            budget={budget}
            setBudget={setBudget}
            mood={mood}
            setMood={setMood}
            onSubmit={generateActivity}
          />
        )}

        {view === "loading" && <LoadingView />}

        {view === "suggestion" && activity && (
          <SuggestionView
            activity={activity}
            onTryAnother={generateActivity}
            onShare={shareActivity}
            onNewInputs={() => setView("input")}
          />
        )}

        {view === "share" && activity && (
          <ShareView
            activity={activity}
            onClose={() => setView("suggestion")}
          />
        )}
      </AnimatePresence>

      <footer className="mt-8 text-sm text-gray-500 text-center">
        <p>
          For the moments when you want to do something, but don't know what
        </p>
        <p className="mt-1">Made with 💙 by Borna in Davis, CA</p>
      </footer>
    </main>
  );
}

/* ───────────── landing view ───────────── */
function LandingView({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center text-center"
    >
      <h1 className="text-4xl font-bold mb-2 text-ucdavis-blue">
        Spontaneous Senior Activities
      </h1>
      <p className="text-xl mb-8 text-gray-600">
        Discover your next Davis adventure
      </p>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={onStart}
          className="bg-ucdavis-blue hover:bg-ucdavis-blue/90 !text-ucdavis-gold text-lg px-8 py-6 [&>span]:text-ucdavis-gold"
        >
          Let's Go!
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.5 } }}
        className="mt-12"
      >
        <Bike className="w-16 h-16 text-aggie-blue" />
      </motion.div>
    </motion.div>
  );
}

/* ───────────── input view ───────────── */
function InputView({
  timeOfDay,
  setTimeOfDay,
  weather,
  setWeather,
  budget,
  setBudget,
  mood,
  setMood,
  onSubmit,
}: {
  timeOfDay: TimeOfDay;
  setTimeOfDay: (time: TimeOfDay) => void;
  weather: Weather;
  setWeather: (weather: Weather) => void;
  budget: Budget;
  setBudget: (budget: Budget) => void;
  mood: Mood;
  setMood: (mood: Mood) => void;
  onSubmit: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-ucdavis-blue">
        What are you up for?
      </h2>

      <Card className="p-6 mb-6 shadow-sm">
        <div className="space-y-6">
          {/* Time of Day */}
          <div>
            <h3 className="text-lg font-medium mb-3">When are you free?</h3>
            <RadioGroup
              value={timeOfDay}
              onValueChange={(v) => setTimeOfDay(v as TimeOfDay)}
              className="grid grid-cols-2 gap-2"
            >
              <TimeOption
                value="Early Bird"
                label="Early Bird"
                subtext="5-10a"
              />
              <TimeOption value="Daytime" label="Daytime" subtext="10a-4p" />
              <TimeOption value="Evening" label="Evening" subtext="4-9p" />
              <TimeOption value="Night" label="Night" subtext="9p-late" />
            </RadioGroup>
          </div>

          {/* Weather */}
          <div>
            <h3 className="text-lg font-medium mb-3">
              What's it like outside?
            </h3>
            <RadioGroup
              value={weather}
              onValueChange={(v) => setWeather(v as Weather)}
              className="grid grid-cols-1 gap-2"
            >
              <WeatherOption
                value="Sunny & Warm"
                label="Sunny & Warm"
                icon={<Sun className="h-4 w-4" />}
              />
              <WeatherOption
                value="Cool & Breezy"
                label="Cool & Breezy"
                icon={<Cloud className="h-4 w-4" />}
              />
              <WeatherOption
                value="Rainy Day"
                label="Rainy Day"
                icon={<CloudRain className="h-4 w-4" />}
              />
              <WeatherOption
                value="Really f*kin hot"
                label="Really f*kin hot"
                icon={<Thermometer className="h-4 w-4" />}
              />
              <WeatherOption
                value="Perfect Davis Evening"
                label="Perfect Davis Evening"
                icon={<Sun className="h-4 w-4" />}
              />
            </RadioGroup>
          </div>

          {/* Budget */}
          <div>
            <h3 className="text-lg font-medium mb-3">What's your budget?</h3>
            <RadioGroup
              value={budget}
              onValueChange={(v) => setBudget(v as Budget)}
              className="grid grid-cols-2 gap-2"
            >
              <BudgetOption value="Broke asf" label="Broke asf" subtext="$0" />
              <BudgetOption
                value="A few dollars"
                label="A few dollars"
                subtext="$5-10"
              />
              <BudgetOption
                value="Treat myself "
                label="Treat myself "
                subtext="$10-20"
              />
              <BudgetOption
                value="Down to spend"
                label="Down to spend"
                subtext="$20+"
              />
            </RadioGroup>
          </div>

          {/* Mood */}
          <div>
            <h3 className="text-lg font-medium mb-3">
              What's your vibe today?
            </h3>
            <RadioGroup
              value={mood}
              onValueChange={(v) => setMood(v as Mood)}
              className="grid grid-cols-2 gap-2"
            >
              <MoodOption
                value="Chill"
                label="Chill"
                icon={<Coffee className="h-4 w-4" />}
              />
              <MoodOption
                value="Adventurous"
                label="Adventurous"
                icon={<Mountain className="h-4 w-4" />}
              />
              <MoodOption
                value="Social"
                label="Social"
                icon={<Users className="h-4 w-4" />}
              />
              <MoodOption
                value="Creative"
                label="Creative"
                icon={<PaintBrush className="h-4 w-4" />}
              />
            </RadioGroup>
          </div>
        </div>
      </Card>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={onSubmit}
          className="bg-ucdavis-blue hover:bg-ucdavis-blue/90 !text-ucdavis-gold text-lg px-8 py-6 w-full [&>span]:!text-ucdavis-gold"
        >
          Generate Spontaneity
        </Button>
      </motion.div>
    </motion.div>
  );
}

/* ───────────── loading view ───────────── */
function LoadingView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      >
        <Bike className="w-16 h-16 text-aggie-blue" />
      </motion.div>
      <p className="mt-4 text-lg text-gray-600">Finding Davis magic...</p>
    </motion.div>
  );
}

/* ───────────── suggestion view ───────────── */
function SuggestionView({
  activity,
  onTryAnother,
  onShare,
  onNewInputs,
}: {
  activity: Activity;
  onTryAnother: () => void;
  onShare: () => void;
  onNewInputs: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-center !text-ucdavis-blue">
        Here's your Davis adventure:
      </h2>

      <Card className="p-6 mb-6 shadow-sm border-2 !border-ucdavis-gold">
        <div className="text-center mb-4">
          <span className="text-4xl">{activity.emoji}</span>
        </div>
        <p className="text-lg mb-4 text-center">{activity.text}</p>
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <strong>Where:</strong> {activity.location}
          </p>
          <p>
            <strong>Time needed:</strong> {activity.duration}
          </p>
        </div>
      </Card>

      <div className="space-y-3">
        <Button
          onClick={onTryAnother}
          className="bg-ucdavis-blue hover:bg-ucdavis-blue/90 !text-ucdavis-gold w-full [&>span]:!text-ucdavis-gold"
        >
          ✨ Try another idea
        </Button>

        <Button
          onClick={onShare}
          variant="outline"
          className="border-aggie-blue text-aggie-blue hover:bg-aggie-blue/10 w-full"
        >
          📱 Share with friends
        </Button>

        <Button
          onClick={onNewInputs}
          variant="ghost"
          className="text-gray-600 hover:text-gray-900 w-full"
        >
          ↩️ Change my filters
        </Button>
      </div>
    </motion.div>
  );
}

/* ───────────── share view ───────────── */
function ShareView({
  activity,
  onClose,
}: {
  activity: Activity;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md"
    >
      <Card className="p-6 mb-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4 text-center text-ucdavis-blue">
          Share this Davis adventure
        </h2>

        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <p className="text-center">
            {activity.emoji} {activity.text}
          </p>
        </div>

        <div className="space-y-3">
          <Button
            className="bg-ucdavis-blue hover:bg-ucdavis-blue/90 text-white w-full"
            onClick={() => alert("Text message sharing would open here")}
          >
            Send as text message
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => alert("Link copied to clipboard!")}
          >
            Copy link
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => alert("Email client would open here")}
          >
            Email
          </Button>
        </div>

        <p className="text-center mt-4 text-sm text-gray-600">
          Spontaneity is better with friends!
        </p>
      </Card>

      <Button onClick={onClose} variant="ghost" className="w-full">
        Back to suggestion
      </Button>
    </motion.div>
  );
}

/* ───────────── helper option components ───────────── */
function TimeOption({
  value,
  label,
  subtext,
}: {
  value: string;
  label: string;
  subtext: string;
}) {
  return (
    <div className="relative">
      <RadioGroupItem
        value={value}
        id={`time-${value}`}
        className="peer sr-only"
      />
      <Label
        htmlFor={`time-${value}`}
        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-aggie-blue [&:has([data-state=checked])]:border-aggie-blue cursor-pointer"
      >
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-xs text-muted-foreground">{subtext}</div>
      </Label>
    </div>
  );
}

function WeatherOption({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative">
      <RadioGroupItem
        value={value}
        id={`weather-${value}`}
        className="peer sr-only"
      />
      <Label
        htmlFor={`weather-${value}`}
        className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-aggie-blue [&:has([data-state=checked])]:border-aggie-blue cursor-pointer"
      >
        <div className="flex items-center gap-2">
          {icon}
          <div className="text-sm font-semibold">{label}</div>
        </div>
      </Label>
    </div>
  );
}

function BudgetOption({
  value,
  label,
  subtext,
}: {
  value: string;
  label: string;
  subtext: string;
}) {
  return (
    <div className="relative">
      <RadioGroupItem
        value={value}
        id={`budget-${value}`}
        className="peer sr-only"
      />
      <Label
        htmlFor={`budget-${value}`}
        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-aggie-blue [&:has([data-state=checked])]:border-aggie-blue cursor-pointer"
      >
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-xs text-muted-foreground">{subtext}</div>
      </Label>
    </div>
  );
}

function MoodOption({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative">
      <RadioGroupItem
        value={value}
        id={`mood-${value}`}
        className="peer sr-only"
      />
      <Label
        htmlFor={`mood-${value}`}
        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-aggie-blue [&:has([data-state=checked])]:border-aggie-blue cursor-pointer"
      >
        <div className="mb-1">{icon}</div>
        <div className="text-sm font-semibold">{label}</div>
      </Label>
    </div>
  );
}

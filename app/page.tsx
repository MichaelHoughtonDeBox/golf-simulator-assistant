"use client";

import { useState, useEffect } from "react"; // Import useEffect
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // Import Select components
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Import Radio components for unit selection
import { Label } from "@/components/ui/label"; // Import Label component

export default function Home() {
  // State to hold the input yardage value
  const [yardage, setYardage] = useState<string>(""); 

  // State to hold the input percentage value
  const [percentage, setPercentage] = useState<string>(""); 

  // State to hold the calculated adjusted distance
  const [adjustedDistance, setAdjustedDistance] = useState<number | null>(null);

  // State to hold the input unit (yards or meters)
  const [inputUnit, setInputUnit] = useState<string>("yards"); 
  
  // State to hold the output unit (yards or meters)
  const [outputUnit, setOutputUnit] = useState<string>("yards"); 

  // Function to convert yards to meters
  const yardsToMeters = (yards: number) => yards * 0.9144;

  // Function to convert meters to yards
  const metersToYards = (meters: number) => meters * 1.09361;

  // {{ edit_1 }}
  // Move calculation logic to a separate function
  const calculateDistance = (distance: string, percent: string, inUnit: string, outUnit: string) => {
    const distanceNum = parseFloat(distance);
    const percentageNum = parseFloat(percent);
    if (distanceNum > 0 && percentageNum > 0) {
      const distanceInYards = inUnit === "meters" ? metersToYards(distanceNum) : distanceNum;
      const adjustedDistanceYards = distanceInYards / (percentageNum / 100);
      const finalDistance = outUnit === "meters" ? yardsToMeters(adjustedDistanceYards) : adjustedDistanceYards;
      return finalDistance;
    }
    return null;
  };

  // {{ edit_2 }}
  // Use useEffect to recalculate whenever any input changes
  useEffect(() => {
    const result = calculateDistance(yardage, percentage, inputUnit, outputUnit);
    setAdjustedDistance(result);
  }, [yardage, percentage, inputUnit, outputUnit, calculateDistance]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      {/* {{ edit_1 }} */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        
        <div className="mb-6">
          <Label htmlFor="yardage" className="block text-gray-700 mb-2 font-bold">Target Distance:</Label>
          <Input
            id="yardage"
            type="number"
            value={yardage}
            onChange={(e) => setYardage(e.target.value)}
            placeholder="Enter target distance"
            className="w-full mb-2"
          />
          <RadioGroup value={inputUnit} onValueChange={setInputUnit} className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yards" id="input-yards" />
              <Label htmlFor="input-yards">Yards</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="meters" id="input-meters" />
              <Label htmlFor="input-meters">Meters</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="mb-6">
          <Label htmlFor="percentage" className="block text-gray-700 mb-2 font-bold">Lie Effect (%):</Label>
          <Select onValueChange={(value) => setPercentage(value)}>
            <SelectTrigger id="percentage" className="w-full">
              <SelectValue placeholder="Select lie effect percentage" />
            </SelectTrigger>
            <SelectContent>
              {[50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100].map((value) => (
                <SelectItem key={value} value={value.toString()}>{value}%</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="mb-6">
          <RadioGroup value={outputUnit} onValueChange={setOutputUnit} className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yards" id="output-yards" />
              <Label htmlFor="output-yards">Yards</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="meters" id="output-meters" />
              <Label htmlFor="output-meters">Meters</Label>
            </div>
          </RadioGroup>
        </div>
        
        {adjustedDistance !== null && (
          <div className="text-lg font-semibold text-center text-black font-bold">
            {adjustedDistance.toFixed(2)} {outputUnit}
          </div>
        )}
      </div>
    </div>
  );
}


import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowLeft } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('gameplay');
  const [masterVolume, setMasterVolume] = useState(80);
  const [musicVolume, setMusicVolume] = useState(70);
  const [sfxVolume, setSfxVolume] = useState(90);
  const [ambientVolume, setAmbientVolume] = useState(85);
  const [tooltips, setTooltips] = useState(true);
  const [hudVisibility, setHudVisibility] = useState("on");
  const [difficulty, setDifficulty] = useState("normal");
  const [fovValue, setFovValue] = useState(90);
  
  // Play sound effect on hover
  const playHoverSound = () => {
    // Would implement actual sound here
    console.log('Hover sound played');
  };

  // Play sound effect on click
  const playClickSound = () => {
    // Would implement actual sound here
    console.log('Click sound played');
  };

  // Prevent scroll on body when settings menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Handle closing with ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Holographic overlay with blurred background */}
          <div 
            className="absolute inset-0 bg-jungle-green/60 backdrop-blur-md"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'overlay',
            }}
          >
            {/* Bioluminescent particle effects */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="floating-spore"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${1 + Math.random() * 2}px`,
                  height: `${1 + Math.random() * 2}px`,
                  animationDuration: `${5 + Math.random() * 15}s`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>

          {/* Settings Panel */}
          <motion.div 
            className="relative z-10 w-[90%] max-w-7xl h-[85vh] bg-jungle-green/90 border border-obsidian rounded-lg overflow-hidden"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-obsidian/50">
              <h1 className="font-orbitron font-bold text-4xl md:text-5xl text-bio-cyan title-glow animate-pulse-glow tracking-wide">
                SETTINGS
              </h1>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-bone-white hover:text-bio-cyan">
                <X size={24} />
              </Button>
            </div>

            {/* Settings Content */}
            <div className="flex h-[calc(100%-80px)]">
              {/* Tabs Navigation */}
              <Tabs 
                defaultValue="gameplay" 
                orientation="vertical" 
                className="flex w-full h-full"
                onValueChange={setActiveTab}
              >
                <div className="border-r border-obsidian/50 w-64 p-4">
                  <TabsList className="flex flex-col h-auto bg-transparent gap-2">
                    {[
                      { id: 'gameplay', label: 'Gameplay' },
                      { id: 'graphics', label: 'Graphics' },
                      { id: 'audio', label: 'Audio' },
                      { id: 'controls', label: 'Controls' },
                      { id: 'accessibility', label: 'Accessibility' }
                    ].map((tab) => (
                      <TabsTrigger 
                        key={tab.id} 
                        value={tab.id}
                        className={`
                          w-full py-4 px-6 justify-start font-orbitron text-lg font-medium
                          transition-all duration-300 rounded-md
                          data-[state=active]:text-bio-cyan data-[state=active]:bg-obsidian/30
                          data-[state=active]:shadow-[0_0_10px_rgba(0,196,180,0.3)]
                          text-bone-white hover:text-bio-cyan
                        `}
                        onMouseEnter={playHoverSound}
                        onClick={playClickSound}
                      >
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 overflow-y-auto settings-content">
                  {/* Gameplay Tab */}
                  <TabsContent value="gameplay" className="h-full mt-0 space-y-8">
                    <div className="space-y-6">
                      <h2 className="font-orbitron text-2xl text-bio-cyan">Difficulty</h2>
                      <ToggleGroup 
                        type="single" 
                        value={difficulty}
                        onValueChange={(value) => value && setDifficulty(value)}
                        className="flex gap-2"
                      >
                        {["easy", "normal", "hard", "nightmare"].map(diff => (
                          <ToggleGroupItem 
                            key={diff} 
                            value={diff}
                            className="font-exo bg-obsidian/50 text-bone-white hover:text-bio-cyan data-[state=on]:bg-bio-cyan/20 data-[state=on]:text-bio-cyan capitalize"
                            onMouseEnter={playHoverSound}
                            onClick={playClickSound}
                          >
                            {diff}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </div>

                    <div className="space-y-6">
                      <h2 className="font-orbitron text-2xl text-bio-cyan">HUD Visibility</h2>
                      <ToggleGroup 
                        type="single" 
                        value={hudVisibility}
                        onValueChange={(value) => value && setHudVisibility(value)}
                        className="flex gap-2"
                      >
                        {["on", "off", "custom"].map(option => (
                          <ToggleGroupItem 
                            key={option} 
                            value={option}
                            className="font-exo bg-obsidian/50 text-bone-white hover:text-bio-cyan data-[state=on]:bg-bio-cyan/20 data-[state=on]:text-bio-cyan capitalize"
                            onMouseEnter={playHoverSound}
                            onClick={playClickSound}
                          >
                            {option}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h2 className="font-orbitron text-2xl text-bio-cyan">Tooltips</h2>
                        <p className="font-exo text-bone-white/70 text-sm">Show contextual hints and information</p>
                      </div>
                      <Switch 
                        checked={tooltips} 
                        onCheckedChange={setTooltips}
                        className="data-[state=checked]:bg-bio-cyan" 
                      />
                    </div>

                    {/* More gameplay settings would go here */}
                  </TabsContent>

                  {/* Graphics Tab */}
                  <TabsContent value="graphics" className="h-full mt-0 space-y-8">
                    <div className="space-y-6">
                      <h2 className="font-orbitron text-2xl text-bio-cyan">Field of View</h2>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-exo text-sm text-bone-white">{fovValue}°</span>
                          <span className="font-exo text-xs text-bone-white/70">60° - 120°</span>
                        </div>
                        <div className="py-2">
                          <Slider 
                            value={[fovValue]} 
                            min={60} 
                            max={120} 
                            step={1}
                            onValueChange={(value) => setFovValue(value[0])}
                            className="[&>.react-slider-track]:bg-bio-cyan [&>.react-slider-thumb]:bg-amber"
                          />
                        </div>
                      </div>
                    </div>

                    {/* More graphics settings would go here */}
                  </TabsContent>

                  {/* Audio Tab */}
                  <TabsContent value="audio" className="h-full mt-0 space-y-8">
                    <div className="space-y-6">
                      <h2 className="font-orbitron text-2xl text-bio-cyan">Master Volume</h2>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-exo text-sm text-bone-white">{masterVolume}%</span>
                        </div>
                        <div className="py-2">
                          <Slider 
                            value={[masterVolume]} 
                            min={0} 
                            max={100} 
                            step={1}
                            onValueChange={(value) => setMasterVolume(value[0])}
                            className="[&>.react-slider-track]:bg-bio-cyan [&>.react-slider-thumb]:bg-amber"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h2 className="font-orbitron text-2xl text-bio-cyan">Music Volume</h2>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-exo text-sm text-bone-white">{musicVolume}%</span>
                        </div>
                        <div className="py-2">
                          <Slider 
                            value={[musicVolume]} 
                            min={0} 
                            max={100} 
                            step={1}
                            onValueChange={(value) => setMusicVolume(value[0])}
                            className="[&>.react-slider-track]:bg-bio-cyan [&>.react-slider-thumb]:bg-amber"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h2 className="font-orbitron text-2xl text-bio-cyan">SFX Volume</h2>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-exo text-sm text-bone-white">{sfxVolume}%</span>
                        </div>
                        <div className="py-2">
                          <Slider 
                            value={[sfxVolume]} 
                            min={0} 
                            max={100} 
                            step={1}
                            onValueChange={(value) => setSfxVolume(value[0])}
                            className="[&>.react-slider-track]:bg-bio-cyan [&>.react-slider-thumb]:bg-amber"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h2 className="font-orbitron text-2xl text-bio-cyan">Ambient Volume</h2>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-exo text-sm text-bone-white">{ambientVolume}%</span>
                        </div>
                        <div className="py-2">
                          <Slider 
                            value={[ambientVolume]} 
                            min={0} 
                            max={100} 
                            step={1}
                            onValueChange={(value) => setAmbientVolume(value[0])}
                            className="[&>.react-slider-track]:bg-bio-cyan [&>.react-slider-thumb]:bg-amber"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Controls Tab */}
                  <TabsContent value="controls" className="h-full mt-0 space-y-8">
                    <div className="space-y-6">
                      <h2 className="font-orbitron text-2xl text-bio-cyan">Key Bindings</h2>
                      <p className="font-exo text-bone-white/70">Click on an action to rebind its key</p>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {[
                          { action: 'Move Forward', key: 'W' },
                          { action: 'Move Backward', key: 'S' },
                          { action: 'Move Left', key: 'A' },
                          { action: 'Move Right', key: 'D' },
                          { action: 'Jump', key: 'SPACE' },
                          { action: 'Sprint', key: 'SHIFT' },
                          { action: 'Crouch', key: 'CTRL' },
                          { action: 'Interact', key: 'E' },
                          { action: 'Inventory', key: 'I' },
                          { action: 'Map', key: 'M' }
                        ].map((binding, index) => (
                          <div 
                            key={index}
                            className="flex justify-between items-center p-3 bg-obsidian/30 rounded-md hover:bg-obsidian/50 transition-colors"
                          >
                            <span className="font-exo text-bone-white">{binding.action}</span>
                            <span className="font-orbitron text-bio-cyan bg-obsidian/70 px-3 py-1 rounded">{binding.key}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Accessibility Tab */}
                  <TabsContent value="accessibility" className="h-full mt-0 space-y-8">
                    <div className="space-y-6">
                      <h2 className="font-orbitron text-2xl text-bio-cyan">UI Scale</h2>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-exo text-sm text-bone-white">100%</span>
                          <span className="font-exo text-xs text-bone-white/70">50% - 150%</span>
                        </div>
                        <div className="py-2">
                          <Slider 
                            value={[100]} 
                            min={50} 
                            max={150} 
                            step={10}
                            className="[&>.react-slider-track]:bg-bio-cyan [&>.react-slider-thumb]:bg-amber"
                          />
                        </div>
                      </div>
                    </div>

                    {/* More accessibility settings would go here */}
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            {/* Footer with Buttons */}
            <div className="absolute bottom-0 right-0 p-6 flex gap-4">
              <Button 
                variant="outline" 
                className="font-exo text-bone-white border-obsidian hover:bg-obsidian/50 hover:text-bio-cyan"
                onMouseEnter={playHoverSound}
                onClick={() => {
                  playClickSound();
                  console.log('Reset defaults');
                }}
              >
                Reset Defaults
              </Button>
              <Button 
                className="font-exo bg-obsidian/70 text-bio-cyan hover:bg-bio-cyan/20 hover:text-bio-cyan"
                onMouseEnter={playHoverSound}
                onClick={() => {
                  playClickSound();
                  onClose();
                }}
              >
                <ArrowLeft className="mr-1" size={16} />
                Back
              </Button>
              <Button 
                className="font-exo bg-bio-cyan/20 text-bio-cyan hover:bg-bio-cyan/30"
                onMouseEnter={playHoverSound}
                onClick={() => {
                  playClickSound();
                  console.log('Apply settings');
                  onClose();
                }}
              >
                <Check className="mr-1" size={16} />
                Apply
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SettingsMenu;

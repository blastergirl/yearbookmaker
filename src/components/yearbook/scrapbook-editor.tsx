'use client';

import { useState, useEffect, useRef } from 'react';
import { Image, Sticker, Type, PenTool, Save, Plus, Trash2, Move, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { yearbookStorage, ScrapbookPage } from '@/lib/yearbook-storage';

// First, create a type for the template names
type TemplateType = 'besties' | 'funMemories' | 'myStyle' | 'hobbies' | 'music' | 'dreams';

interface ScrapbookEditorProps {
  yearbookId: string;
  selectedTemplate?: TemplateType;
}

const TEMPLATE_TITLES: Record<TemplateType, string> = {
  'besties': '👭 BFF Page',
  'funMemories': '🎉 Fun Times',
  'myStyle': '👗 My Style',
  'hobbies': '⭐ My Hobbies',
  'music': '🎵 Music & Dance',
  'dreams': '👑 Dreams & Goals',
};

const STICKERS = [
  '✨', '🌟', '💖', '🎀', '🌸', '🦋', '🌈', '⭐', 
  '🎵', '🎨', '📸', '💝', '🎭', '🎪', '🎡', '🎉'
];

const BACKGROUNDS = [
  'bg-pink-100',
  'bg-purple-100',
  'bg-blue-100',
  'bg-gradient-to-r from-pink-100 to-purple-100',
  'bg-gradient-to-r from-purple-100 to-blue-100',
  'bg-[url("/patterns/hearts.png")]',
  'bg-[url("/patterns/stars.png")]',
];

export function ScrapbookEditor({ yearbookId, selectedTemplate }: ScrapbookEditorProps) {
  const [activeTool, setActiveTool] = useState<'photo' | 'sticker' | 'text' | 'draw' | null>(null);
  const [selectedBackground, setSelectedBackground] = useState(BACKGROUNDS[0]);
  const [elements, setElements] = useState<Array<any>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedElement, setSelectedElement] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const getTemplateTitle = () => {
    return selectedTemplate ? (TEMPLATE_TITLES[selectedTemplate] || 'My Scrapbook Page') : 'My Scrapbook Page';
  };

  // Get template-specific stickers
  const getTemplateStickers = () => {
    switch (selectedTemplate) {
      case 'besties':
        return ['💖', '👭', '🌟', '✨', '🎀', '💝', '💕', '🤗', '💫', '🌸'];
      case 'funMemories':
        return ['🎉', '🎨', '🎭', '🎪', '🎡', '🎢', '🎠', '🎮', '🎯', '🎲'];
      case 'myStyle':
        return ['👗', '👜', '👠', '🎀', '💄', '👒', '👚', '💅', '👛', '👢'];
      case 'hobbies':
        return ['⚽', '🎨', '🎵', '📚', '🎭', '🎬', '🎹', '🎸', '⚾', '🏃‍♀️'];
      case 'music':
        return ['🎵', '🎤', '💃', '🎼', '🎸', '🎹', '🎧', '🎻', '🥁', '🎺'];
      case 'dreams':
        return ['✨', '🌈', '⭐', '🦋', '🌟', '🚀', '🌙', '💫', '🔮', '🌺'];
      default:
        return STICKERS;
    }
  };

  // Get template-specific backgrounds
  const getTemplateBackgrounds = () => {
    const commonGradients = [
      'bg-gradient-to-r from-pink-100 to-purple-100',
      'bg-gradient-to-r from-purple-100 to-blue-100',
    ];

    switch (selectedTemplate) {
      case 'besties':
        return [
          'bg-gradient-to-r from-pink-200 to-purple-200',
          'bg-gradient-to-r from-red-100 to-pink-100',
          ...commonGradients
        ];
      case 'funMemories':
        return [
          'bg-gradient-to-r from-blue-200 to-purple-200',
          'bg-gradient-to-r from-yellow-100 to-orange-100',
          ...commonGradients
        ];
      // Add cases for other templates...
      default:
        return BACKGROUNDS;
    }
  };

  useEffect(() => {
    if (selectedTemplate) {
      // Set default background based on template
      setSelectedBackground(getTemplateBackgrounds()[0]);
    }
  }, [selectedTemplate]);

  const handleAddSticker = (sticker: string) => {
    setElements([
      ...elements,
      {
        id: Date.now(),
        type: 'sticker',
        content: sticker,
        position: { x: 50, y: 50 },
        rotation: 0,
        scale: 1,
      },
    ]);
  };

  const handleSave = () => {
    const newPage: ScrapbookPage = {
      id: Date.now().toString(),
      background: selectedBackground,
      elements: elements,
    };

    // Save to local storage
    const yearbook = yearbookStorage.getYearbookById(yearbookId);
    if (yearbook) {
      const updatedYearbook = {
        ...yearbook,
        scrapbook: [...(yearbook.scrapbook || []), newPage],
      };
      yearbookStorage.updateYearbook(yearbookId, updatedYearbook);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setElements([
          ...elements,
          {
            id: Date.now(),
            type: 'photo',
            content: event.target?.result,
            position: { x: 50, y: 50 },
            rotation: 0,
            scale: 1,
          },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
    setActiveTool('photo');
  };

  const handleTextClick = () => {
    setActiveTool('text');
    // Automatically add a new text box when clicking the text tool
    setElements([
      ...elements,
      {
        id: Date.now(),
        type: 'text',
        content: 'Click to edit text',
        position: { x: 50, y: 50 },
        rotation: 0,
        scale: 1,
      },
    ]);
  };

  const handleStickerClick = () => {
    setActiveTool(activeTool === 'sticker' ? null : 'sticker');
  };

  const handleDrawClick = () => {
    setActiveTool(activeTool === 'draw' ? null : 'draw');
  };

  const handleElementClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedElement(index);
  };

  const handleCanvasClick = () => {
    setSelectedElement(null);
  };

  const handleDragStart = (e: React.MouseEvent, element: any) => {
    setIsDragging(true);
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (isDragging && selectedElement !== null) {
      const canvas = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - canvas.left - dragStart.x) / canvas.width) * 100;
      const y = ((e.clientY - canvas.top - dragStart.y) / canvas.height) * 100;

      const newElements = [...elements];
      newElements[selectedElement] = {
        ...newElements[selectedElement],
        position: { x: Math.max(0, Math.min(x, 100)), y: Math.max(0, Math.min(y, 100)) },
      };
      setElements(newElements);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDelete = (index: number) => {
    const newElements = elements.filter((_, i) => i !== index);
    setElements(newElements);
    setSelectedElement(null);
  };

  const handleResize = (index: number, scale: number) => {
    const newElements = [...elements];
    newElements[index] = {
      ...newElements[index],
      scale: Math.max(0.5, Math.min(2, newElements[index].scale + scale)),
    };
    setElements(newElements);
  };

  const handleRotate = (index: number) => {
    const newElements = [...elements];
    newElements[index] = {
      ...newElements[index],
      rotation: (newElements[index].rotation + 45) % 360,
    };
    setElements(newElements);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
          {getTemplateTitle()} ✨
        </h2>
        <button 
          onClick={handleSave}
          className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Page
        </button>
      </div>

      {/* Tools Panel */}
      <div className="flex space-x-4 bg-white p-4 rounded-xl shadow-sm">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handlePhotoUpload}
        />
        <button
          onClick={handlePhotoClick}
          className={`p-3 rounded-lg flex flex-col items-center ${
            activeTool === 'photo' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'
          }`}
        >
          <Image className="h-6 w-6 mb-1" />
          <span className="text-sm">Add Photo</span>
        </button>
        <button
          onClick={handleStickerClick}
          className={`p-3 rounded-lg flex flex-col items-center ${
            activeTool === 'sticker' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'
          }`}
        >
          <Sticker className="h-6 w-6 mb-1" />
          <span className="text-sm">Stickers</span>
        </button>
        <button
          onClick={handleTextClick}
          className={`p-3 rounded-lg flex flex-col items-center ${
            activeTool === 'text' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'
          }`}
        >
          <Type className="h-6 w-6 mb-1" />
          <span className="text-sm">Add Text</span>
        </button>
        <button
          onClick={handleDrawClick}
          className={`p-3 rounded-lg flex flex-col items-center ${
            activeTool === 'draw' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'
          }`}
        >
          <PenTool className="h-6 w-6 mb-1" />
          <span className="text-sm">Draw</span>
        </button>
      </div>

      {/* Background Selector */}
      <div className="flex space-x-2 overflow-x-auto pb-4">
        {getTemplateBackgrounds().map((bg, index) => (
          <button
            key={index}
            onClick={() => setSelectedBackground(bg)}
            className={`w-12 h-12 rounded-lg ${bg} flex-shrink-0 border-2 ${
              selectedBackground === bg ? 'border-purple-500' : 'border-transparent'
            }`}
          />
        ))}
      </div>

      {/* Scrapbook Canvas */}
      <div 
        className={`aspect-[4/3] ${selectedBackground} rounded-xl shadow-lg p-8 relative`}
        onClick={handleCanvasClick}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        {elements.map((element, index) => (
          <div
            key={element.id}
            onClick={(e) => handleElementClick(index, e)}
            onMouseDown={(e) => handleDragStart(e, element)}
            style={{
              position: 'absolute',
              left: `${element.position.x}%`,
              top: `${element.position.y}%`,
              transform: `rotate(${element.rotation}deg) scale(${element.scale})`,
              fontSize: element.type === 'sticker' ? '2rem' : 'inherit',
              cursor: isDragging ? 'grabbing' : 'grab',
              zIndex: selectedElement === index ? 10 : 1,
            }}
            className="group"
          >
            {element.type === 'photo' ? (
              <img 
                src={element.content as string} 
                alt="Uploaded" 
                className="w-32 h-32 object-cover rounded-lg shadow-md"
                draggable={false}
              />
            ) : element.type === 'text' ? (
              <div 
                className="p-2 min-w-[100px] text-lg"
                contentEditable
                suppressContentEditableWarning
              >
                {element.content}
              </div>
            ) : (
              element.content
            )}

            {/* Controls that appear when element is selected */}
            {selectedElement === index && (
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-white rounded-full shadow-lg px-2 py-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleResize(index, -0.1);
                  }}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <ZoomOut className="h-4 w-4 text-gray-600" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleResize(index, 0.1);
                  }}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <ZoomIn className="h-4 w-4 text-gray-600" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRotate(index);
                  }}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <RotateCw className="h-4 w-4 text-gray-600" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(index);
                  }}
                  className="p-1 hover:bg-gray-100 rounded-full text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Text Input when text tool is active */}
        {activeTool === 'text' && (
          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg">
            <button
              onClick={() => {
                setElements([
                  ...elements,
                  {
                    id: Date.now(),
                    type: 'text',
                    content: 'Click to edit text',
                    position: { x: 50, y: 50 },
                    rotation: 0,
                    scale: 1,
                  },
                ]);
              }}
              className="w-full py-2 px-4 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
            >
              Add Text Box
            </button>
          </div>
        )}

        {/* Sticker Panel */}
        {activeTool === 'sticker' && (
          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg">
            <div className="grid grid-cols-8 gap-2">
              {getTemplateStickers().map((sticker, index) => (
                <button
                  key={index}
                  onClick={() => handleAddSticker(sticker)}
                  className="text-2xl hover:scale-125 transition-transform"
                >
                  {sticker}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Drawing Canvas */}
        {activeTool === 'draw' && (
          <div className="absolute inset-0 bg-transparent">
            {/* We'll implement drawing functionality in the next iteration */}
            <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 text-center">
              Drawing tools coming soon! ✨
            </div>
          </div>
        )}
      </div>

      {/* Add New Page Button */}
      <button className="w-full py-3 flex items-center justify-center text-purple-600 hover:bg-purple-50 rounded-lg border-2 border-dashed border-purple-300">
        <Plus className="h-5 w-5 mr-2" />
        Add New Page
      </button>
    </div>
  );
} 
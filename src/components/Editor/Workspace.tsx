import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Rect, Circle, Text, Transformer, Image as KonvaImage } from 'react-konva';
import { useEditorStore, CanvasElement } from '../../store/useEditorStore';
import useImage from 'use-image';

const URLImage = ({ element, isSelected, onSelect, onChange }: { 
  element: CanvasElement; 
  isSelected: boolean;
  onSelect: () => void;
  onChange: (updates: Partial<CanvasElement>) => void;
}) => {
  const [img] = useImage(element.src || '');
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <KonvaImage
        image={img}
        ref={shapeRef}
        {...element}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
            rotation: node.rotation(),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

const ShapeElement = ({ element, isSelected, onSelect, onChange }: { 
  element: CanvasElement; 
  isSelected: boolean;
  onSelect: () => void;
  onChange: (updates: Partial<CanvasElement>) => void;
}) => {
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const ShapeComponent = element.type === 'rect' ? Rect : Circle;

  return (
    <>
      <ShapeComponent
        ref={shapeRef}
        {...element}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
            rotation: node.rotation(),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

const TextElement = ({ element, isSelected, onSelect, onChange }: { 
  element: CanvasElement; 
  isSelected: boolean;
  onSelect: () => void;
  onChange: (updates: Partial<CanvasElement>) => void;
}) => {
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Text
        ref={shapeRef}
        {...element}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            rotation: node.rotation(),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          enabledAnchors={['middle-left', 'middle-right']}
          boundBoxFunc={(oldBox, newBox) => {
            newBox.width = Math.max(30, newBox.width);
            return newBox;
          }}
        />
      )}
    </>
  );
};

export const Workspace = () => {
  const { elements, selectedId, setSelectedId, updateElement, backgroundColor } = useEditorStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        // Calculate size to fit container with padding
        const padding = window.innerWidth < 768 ? 20 : 80;
        const availableWidth = clientWidth - padding;
        const availableHeight = clientHeight - padding;
        
        // Maintain a 1:1 aspect ratio for the canvas by default or fit to available
        const size = Math.min(availableWidth, availableHeight);
        setDimensions({ width: size, height: size });
      }
    };

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-sm overflow-hidden transition-all" style={{ width: dimensions.width, height: dimensions.height }}>
        <Stage
          width={dimensions.width}
          height={dimensions.height}
          onMouseDown={handleDeselect}
          onTouchStart={handleDeselect}
        >
          <Layer>
            {/* Background */}
            <Rect 
              width={dimensions.width} 
              height={dimensions.height} 
              fill={backgroundColor} 
            />
            
            {elements.map((el) => {
              const isSelected = el.id === selectedId;
              const onSelect = () => setSelectedId(el.id);
              const onChange = (updates: Partial<CanvasElement>) => updateElement(el.id, updates);

              if (el.type === 'image') {
                return <URLImage key={el.id} element={el} isSelected={isSelected} onSelect={onSelect} onChange={onChange} />;
              }
              if (el.type === 'text') {
                return <TextElement key={el.id} element={el} isSelected={isSelected} onSelect={onSelect} onChange={onChange} />;
              }
              return <ShapeElement key={el.id} element={el} isSelected={isSelected} onSelect={onSelect} onChange={onChange} />;
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

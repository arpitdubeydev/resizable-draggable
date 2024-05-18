import React, { useEffect } from 'react';
import interact from 'interactjs';
import CollapsibleTable from './components/CollapsibleTable';
import './App.css'; // Ensure you have your CSS styles set up

const UITask = () => {
  useEffect(() => {
    interact('.resizable')
      .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        modifiers: [
          interact.modifiers.restrictEdges({
            outer: 'parent',
          }),
          interact.modifiers.restrictSize({
            min: { width: 100, height: 50 },
          }),
        ],
        inertia: true,
      })
      .on('resizemove', event => {
        const target = event.target;
        let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.deltaRect.left;
        let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.deltaRect.top;

        target.style.width = `${event.rect.width}px`;
        target.style.height = `${event.rect.height}px`;
        target.style.transform = `translate(${x}px, ${y}px)`;

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        target.textContent = `${Math.round(event.rect.width)}×${Math.round(event.rect.height)}`;
      });

    interact('.draggable')
      .draggable({
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'parent',
          }),
        ],
        listeners: {
          move(event) {
            const target = event.target;
            const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            target.style.transform = `translate(${x}px, ${y}px)`;
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
          },
        },
      });
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="resizable bg-blue-200 p-4 draggable" data-x="0" data-y="0">
        Content 1
      </div>
      <div className="resizable bg-green-200 p-4 draggable" data-x="0" data-y="0">
        <CollapsibleTable/>
      </div>
      <div className="resizable bg-red-200 p-4 draggable" data-x="0" data-y="0">
        Content 3
      </div>
    </div>
  );
};

export default UITask;

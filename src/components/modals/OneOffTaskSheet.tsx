import React, { useState } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { TaskType } from '../../types';

interface OneOffTaskSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OneOffTaskSheet: React.FC<OneOffTaskSheetProps> = ({ isOpen, onClose }) => {
  const { addOneOffTask, showIsland } = usePlanner();

  const [timeVal, setTimeVal] = useState('02:30 PM');
  const [actVal, setActVal] = useState('');
  const [instrVal, setInstrVal] = useState('');
  const [ruleVal, setRuleVal] = useState('');
  const [typeVal, setTypeVal] = useState<TaskType>('hack');

  if (!isOpen) return null;

  const handleSave = () => {
    if (!actVal.trim() || !timeVal.trim()) {
      showIsland('Enter Name & Time');
      return;
    }

    addOneOffTask({
      t: timeVal.trim(),
      act: actVal.trim(),
      instr: instrVal.trim() || 'Custom Activity Details',
      rule: ruleVal.trim() || 'Execute Today',
      type: typeVal,
      reminder: true
    });

    setActVal('');
    setInstrVal('');
    setRuleVal('');
    onClose();
  };

  return (
    <>
      <div className="sheet-backdrop active" onClick={onClose} />
      <div className="bottom-sheet active">
        <div className="sheet-drag-handle" />
        <h3 style={{ margin: 0, fontWeight: 800 }}>Add Today's Task</h3>

        <span className="sm-label">Time (e.g. 02:30 PM)</span>
        <input
          className="sm-input"
          placeholder="02:30 PM"
          value={timeVal}
          onChange={(e) => setTimeVal(e.target.value)}
        />

        <span className="sm-label">Activity Name</span>
        <input
          className="sm-input"
          placeholder="e.g. Doctor Visit / Electrolyte Sip"
          value={actVal}
          onChange={(e) => setActVal(e.target.value)}
        />

        <span className="sm-label">Instruction</span>
        <input
          className="sm-input"
          placeholder="e.g. Annual physical checkup / Blood test"
          value={instrVal}
          onChange={(e) => setInstrVal(e.target.value)}
        />

        <span className="sm-label">Rule / Target</span>
        <input
          className="sm-input"
          placeholder="e.g. Fasting since 10 AM"
          value={ruleVal}
          onChange={(e) => setRuleVal(e.target.value)}
        />

        <span className="sm-label">Type</span>
        <select
          className="sm-input"
          value={typeVal}
          onChange={(e) => setTypeVal(e.target.value as TaskType)}
          style={{ padding: '10px' }}
        >
          <option value="hack">Bio-Hack</option>
          <option value="meal">Meal</option>
          <option value="workout">Workout</option>
          <option value="custom">Custom</option>
        </select>

        <button className="btn-primary" onClick={handleSave}>
          Add Task
        </button>
      </div>
    </>
  );
};

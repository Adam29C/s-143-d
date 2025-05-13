import React from 'react';
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";

const FormWizardComponent = ({ shape, color, onComplete, onTabChange, tabs }) => {
return (
    <FormWizard shape={shape}  stepSize="sm" color={color} onComplete={onComplete} onTabChange={onTabChange}>
      {tabs.map((tab, index) => (
        <FormWizard.TabContent key={index} title={tab.title} icon={tab.icon}>
          {tab.content}
        </FormWizard.TabContent>
      ))}
    </FormWizard>
  );
};

export default FormWizardComponent;

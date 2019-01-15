export const REGEX_STEP_NAME = /^(\S+) ([\s\S]+)$/;

export default function composeSteps(libraryFactory, ...stepDefinitions) {
  return function () {
    const library = libraryFactory();

    stepDefinitions.forEach((stepDefinition) => {
      Object
        .keys(stepDefinition)
        .forEach((stepName) => {
          const stepImplementation = stepDefinition[stepName];

          const [, methodNameRaw, assertionNameRaw] = stepName.match(REGEX_STEP_NAME);
          const methodName = methodNameRaw.toLowerCase();

          const decoratedCallback = function (...args) {
            return stepImplementation.call(this, ...args);
          };

          if (typeof library[methodName] !== "function") {
            throw new Error(`Yadda step name must start with given/when/then/define, was: "${stepName}"`);
          }

          // https://github.com/acuminous/yadda/issues/243#issuecomment-453115035
          const assertionName = `${assertionNameRaw}$`;

          library[methodName](assertionName, decoratedCallback);
        });
    });

    return library;
  };
}
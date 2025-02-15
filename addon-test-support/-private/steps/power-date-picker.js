import { assert }  from '@ember/debug';
import { click } from '@ember/test-helpers';
import { calendarSelect } from 'ember-power-calendar/test-support/helpers';

import {
  powerDatePickerFindTrigger,
  powerDatePickerFindDropdown,
  POWER_DATE_PICKER_DROPDOWN_SELECTOR
} from 'ember-cli-yadda-opinionated/test-support/-private/dom-helpers';

const steps = {

  async "When I select date $opinionatedString in the date picker $opinionatedElement"(dateString, [collection]) {
    assert(`Expected a single element, but ${collection.length} found.`, collection.length === 1);
    const [element] = collection;

    const date = new Date(dateString);
    const trigger = powerDatePickerFindTrigger(element);
    let dropdown = powerDatePickerFindDropdown(trigger);
    const isExpanded = !!dropdown;

    if (!isExpanded) {
      await click(trigger);
    }

    return calendarSelect(POWER_DATE_PICKER_DROPDOWN_SELECTOR, date);
  },

};

export default steps;

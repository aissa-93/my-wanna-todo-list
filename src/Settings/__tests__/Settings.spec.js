/* eslint-env mocha, jest */

import getActualComponentFactory from '../../lib/testUtils';
import Settings from '../Settings';

const defaultProps = {
  sidebarExpanded: true,
  calendarSystem: 'en-US',
  fullscreen: false,
  firstDayOfWeek: 0,
  showNotYetTasks: true,
  toggleNotYet() {},
  toggleFullscreen() {},
  changeCalendarSystem() {},
  changeFirstDayOfWeek() {},
};
const getActualSettings = getActualComponentFactory(Settings, defaultProps);


jest.useFakeTimers();

it('should render', () => {
  getActualSettings();
});
it('should be a div', () => {
  const wrapper = getActualSettings();
  expect(wrapper.is('div.Settings')).toBe(true);
});
it('should have 4 ListItem', () => {
  const wrapper = getActualSettings();
  expect(wrapper.find('ListItem').length).toBe(4);
});
it('should have 4 Divider', () => {
  const wrapper = getActualSettings();
  expect(wrapper.find('Divider').length).toBe(4);
});
it('should have 1 CalendarSystemDialog', () => {
  const wrapper = getActualSettings();
  expect(wrapper.find('CalendarSystemDialog').length).toBe(1);
});
it('should have 1 FirstDayOfWeekDialog', () => {
  const wrapper = getActualSettings();
  expect(wrapper.find('FirstDayOfWeekDialog').length).toBe(1);
});

it('should set left margin style based on props', () => {
  const wrapper = getActualSettings({
    sidebarExpanded: false,
  });
  expect(wrapper.prop('style').marginLeft).toBe(56);
});
it('should set ListItem secondaryText based on props', () => {
  const wrapper = getActualSettings({
    calendarSystem: 'fa-IR',
  });
  expect(wrapper.find('ListItem').at(0).prop('secondaryText')).toBe('fa-IR');
});
it('should set ListItem secondaryText based on props', () => {
  const wrapper = getActualSettings({
    firstDayOfWeek: 6,
  });
  expect(wrapper.find('ListItem').at(1).prop('secondaryText')).toBe('Saturday');
});
it('should set fullscreen Checkbox defaultChecked based on props', () => {
  const wrapper = getActualSettings({
    fullscreen: true,
  });
  expect(wrapper.find('ListItem').at(2).prop('leftCheckbox').props.defaultChecked).toBe(true);
});
it('should set show not yet tasks Checkbox defaultChecked based on props', () => {
  const wrapper = getActualSettings({
    showNotYetTasks: false,
  });
  expect(wrapper.find('ListItem').at(3).prop('leftCheckbox').props.defaultChecked).toBe(false);
});
it('should set CalendarSystemDialog calendarSystem based on props', () => {
  const wrapper = getActualSettings({
    calendarSystem: 'fa-IR',
  });
  expect(wrapper.find('CalendarSystemDialog').prop('calendarSystem')).toBe('fa-IR');
});
it('should set FirstDayOfWeekDialog dialog firstDayOfWeek based on props', () => {
  const wrapper = getActualSettings({
    firstDayOfWeek: 6,
  });
  expect(wrapper.find('FirstDayOfWeekDialog').prop('firstDayOfWeek')).toBe(6);
});

it('should call toggleNotYet when handling show not yet check', () => {
  const wrapper = getActualSettings({
    toggleNotYet(checked) {
      expect(checked).toBe(true);
    },
  });
  wrapper.find('ListItem').at(3).prop('leftCheckbox').props.onCheck(null, true);
});
it('should call toggleFullscreen when handling fullscreen check', () => {
  const wrapper = getActualSettings({
    toggleFullscreen(checked) {
      expect(checked).toBe(true);
    },
  });
  wrapper.find('ListItem').at(2).prop('leftCheckbox').props.onCheck(null, true);
});
it('should call changeCalendarSystem when handling calendar system dialog close request', () => {
  const wrapper = getActualSettings({
    changeCalendarSystem(calendarSystem) {
      expect(calendarSystem).toBe('fa-IR');
    },
  });
  wrapper.find('CalendarSystemDialog').props().onRequestClose('fa-IR');
});
it('should call changeCalendarSystem when handling first day of week dialog close request', () => {
  const wrapper = getActualSettings({
    changeFirstDayOfWeek(firstDayOfWeek) {
      expect(firstDayOfWeek).toBe(6);
    },
  });
  wrapper.find('FirstDayOfWeekDialog').props().onRequestClose(6);
});

it('should set CalendarSystemDialog open based on state', () => {
  const wrapper = getActualSettings();
  wrapper.find('ListItem').at(0).props().onClick();
  wrapper.update();
  expect(wrapper.find('CalendarSystemDialog').prop('open')).toBe(true);
});
it('should set FirstDayOfWeekDialog open based on state', () => {
  const wrapper = getActualSettings();
  wrapper.find('ListItem').at(1).props().onClick();
  wrapper.update();
  expect(wrapper.find('FirstDayOfWeekDialog').prop('open')).toBe(true);
});

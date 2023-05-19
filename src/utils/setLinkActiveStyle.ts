import { TSetLinkActiveStyle } from './types';

const setLinkActiveStyle: TSetLinkActiveStyle = ({ isActive }) => ({
  color: isActive ? '#F2F2F3' : '#8585AD',
});

export default setLinkActiveStyle;

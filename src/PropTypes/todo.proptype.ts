import PropTypes from 'prop-types'

export const TodoTypes = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  done: PropTypes.bool
})

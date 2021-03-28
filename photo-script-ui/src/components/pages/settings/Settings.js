import React, { useContext, useEffect } from 'react'
import { Route, Switch, useHistory, useRouteMatch } from 'react-router'
import { Link } from 'react-router-dom';
import css from './Settings.module.scss'
import AccountSettings from './AccountSettings'
import ProfileSettings from './ProfileSettings';
import CustomizationSettings from './CustomizationSettings';
import PasscodeSettings from './PasscodeSettings';
import { MainContext } from '../../context/MainContext';

const Settings = () => {

  const { loggedIn } = useContext(MainContext);
  let { path, url } = useRouteMatch();

  const styles = {
    backgroundColor: '#242834',
    borderRadius: '10px'
  }

  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      history.push('/settings/account')
    } else {
      history.push('/settings/customization')
    }
  }, [history])

  return (
    <div className={css.mainContainer}>
      <div className={css.childContainer}>
          <div className="row">
            <h2 className="mt-3 ml-5 font-weight-bold" style={{ color: "#eee", marginBottom:'40px' }}>Settings</h2>
          </div>
          <div className="row">
            <div className="col-3">
              <div className="p-2" style={styles}>
                {
                  loggedIn ?
                    <ul style={{ listStyleType: 'none' }}>
                      <li className="mb-3 mt-3">
                        <Link className={css.links} to={`${url}/account`}>Account</Link>
                      </li>
                      <li className="mb-3 mt-3">
                        <Link className={css.links} to={`${url}/profile`}>Profile</Link>
                      </li>
                      <li className="mb-3 mt-3">
                        <Link className={css.links} to={`${url}/customization`}>Customization</Link>
                      </li>
                      <li className="mb-3 mt-3">
                        <Link className={css.links} to={`${url}/passcode`}>Change Passcode</Link>
                      </li>
                    </ul>
                    :
                    <ul style={{ listStyleType: 'none' }}>
                      <li className="mb-3 mt-3">
                        <Link className={css.links} to={`${url}/customization`}>Customization</Link>
                      </li>
                    </ul>
                }
              </div>
            </div>
            <div className="col-9">
              <div className="p-2" style={styles}>
                {loggedIn ?
                  <Switch>
                    <Route exact path={`${path}/account`} component={AccountSettings} />
                    <Route exact path={`${path}/profile`} component={ProfileSettings} />
                    <Route exact path={`${path}/customization`} component={CustomizationSettings} />
                    <Route exact path={`${path}/passcode`} component={PasscodeSettings} />
                  </Switch>
                  :
                  <Switch>
                    <Route exact path={`${path}/customization`} component={CustomizationSettings} />
                  </Switch>
                }
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Settings
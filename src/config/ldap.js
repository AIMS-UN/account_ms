// Esta es la librería del LDAP para editarlo
const Ldap = require('ldap-async').default;

// Esta es la librería del LDAP para autenticar
const { authenticate } = require('ldap-authentication');

const orgUnit = 'ou=aimsUser,dc=aims,dc=edu,dc=co';

class accountLDAP {
  static ldap = new Ldap({
    url: process.env.LDAP_URL,
    bindDN: process.env.LDAP_ROOT,
    bindCredentials: process.env.LDAP_PASSWORD,
  });

  static async createOrganization() {
    try {
      await this.ldap.add(orgUnit, {ou: 'aimsUser', objectClass: ['organizationalUnit']})
    } catch (err) {
      if (err.lde_message !== 'Entry Already Exists') {
        console.log(err);
        console.log('LDAP_ORG_UNIT_ERROR');
        process.exit();
      }
      console.log('Conectado correctamente con el LDAP');
    }
  }

  static async registerUser(uid, userPassword) {
    try {
      await this.ldap.add(this.setLDAPName(uid), {
        uid,
        userPassword,
        objectClass: ['account', 'simpleSecurityObject'],
      });
    } catch (err) {
      throw err.lde_message === 'Entry Already Exists' ? 'USERNAME_ALREADY_TAKEN' : 'LDAP_AUTH_ERROR';
    }
  }

  static async loginUser(userDn, userPassword) {
    try {
      await authenticate({
        ldapOpts: { url: process.env.LDAP_URL },
        userDn,
        userPassword,
      });
    } catch (err) {
      throw err.lde_message === 'Invalid Credentials' ? 'INVALID_CREDENTIALS' : 'LDAP_AUTH_ERROR';
    }
  }

  static async updateUser(oldUid, newUid, userPassword) {
    try {
      await this.ldap.modifyDN(this.setLDAPName(oldUid), this.setLDAPName(newUid));
      await this.ldap.setAttributes(this.setLDAPName(newUid), { userPassword });
    } catch (err) {
      throw err.lde_message === 'No Such Object' ? 'LDAP_USER_NOT_FOUND' : 'LDAP_AUTH_ERROR';
    }
  }

  static setLDAPName(uid) {
    return `uid=${uid},${orgUnit}`;
  }
}

// Exportar los controladores
module.exports = accountLDAP;

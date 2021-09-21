
package evoting.dto;

/**
 *
 * @author sandeep
 */
public class UserDetails {
    public String userid;
    public String password;
    public String username;
    public String address;
    public String city;
    public String email;
    public long mobile;

    public UserDetails(String userid, String password, String username, String address, String city, String email, long mobile) {
        this.userid = userid;
        this.password = password;
        this.username = username;
        this.address = address;
        this.city = city;
        this.email = email;
        this.mobile = mobile;
    }

    public UserDetails() {
    }

    @Override
    public String toString() {
        return "User_Details{" + "userid=" + userid + ", password=" + password + ", username=" + username + ", address=" + address + ", city=" + city + ", email=" + email + ", mobile=" + mobile + '}';
    }
    

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public long getMobile() {
        return mobile;
    }

    public void setMobile(long mobile) {
        this.mobile = mobile;
    }
    
    
}

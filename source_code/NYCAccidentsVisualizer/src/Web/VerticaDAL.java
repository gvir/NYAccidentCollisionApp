package Web;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;


/**Handles Call to Vertica database*/
public class VerticaDAL {
	/** connention to vertica*/
	private  Connection conn;
	/** connention string vertica*/
	private String connectionString;
	/** user name vertica*/
	private String userName;
	/** password vertica*/
	private String password;
	
	
	/** Laod the connection to conn variable
	 * @throws ClassNotFoundException
	 * @throws SQLException
	 */
	private  void getConnection() throws ClassNotFoundException,
	SQLException {
		try {
			// load driver
			Class.forName("com.vertica.jdbc.Driver");
			conn = DriverManager.getConnection(
					connectionString,
					userName, password);
		} catch (ClassNotFoundException e) {
			// System.err.println("Could not find the JDBC driver class.\n");
			e.printStackTrace();
			throw e;
		} catch (SQLException e) {
			e.printStackTrace();
			throw e;
		}
	}
	
	/**constructor, instanize connectionString, userName and pasWord*/
	public VerticaDAL(String address, String name, String passWord)
	{
		connectionString = address;
		userName = name;
		password = passWord;
	}
	
	/** Execute the query*
	 * @param query Executes the query
	 * @return
	 * @throws ClassNotFoundException
	 * @throws SQLException
	 */
	public  List<AccidentDTO> executeQuery(String query) throws ClassNotFoundException,SQLException {
		if (conn == null || conn.isClosed()) {
			// instanize the connection
			getConnection();
		}

		try {
			// execute the query
			List<AccidentDTO> data = new ArrayList<AccidentDTO>();
			Statement select = conn.createStatement();
			ResultSet result = select.executeQuery(query);
			// fille to DTO class
			while(result.next())
			{
				AccidentDTO row = new AccidentDTO();
				row.latitude = result.getFloat("latitude");
				row.longitude = result.getFloat("longitude");
				row.location = result.getString("location");
				row.on_street_name = result.getString("on_street_name");
				row.cross_street_name = result.getString("cross_street_name");
				row.off_street_name = result.getString("off_street_name");
				data.add(row);
			}
			select.close();
			conn.close();
			return data;
		} catch (SQLException e) {
			e.printStackTrace();
			throw e;
		}

	}

}

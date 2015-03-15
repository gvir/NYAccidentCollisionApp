package Web;


import java.io.IOException;
import java.util.List;
import java.util.Properties;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.*;
import java.io.OutputStream;

/**
 * Servlet implementation class Index
 */
@WebServlet("/Index")
public class Index extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Index() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		// redirect the call to JSP page
		RequestDispatcher requestDispatcher = request
                .getRequestDispatcher("pages/index.jsp");
        requestDispatcher.forward(request, response);
	}

	/**
	 * Handles the AJAX call from client
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
		// TODO Auto-generated method stub
		// get query param
		String query  = request.getParameter("query");
		Properties properties = new Properties();
		// load connection string and other data
		properties.load(getServletContext().getResourceAsStream("WEB-INF/config.properties"));
		String url = properties.getProperty("jdbc.url");
		String username = properties.getProperty("jdbc.username");
		String password = properties.getProperty("jdbc.password");
		VerticaDAL dal = new VerticaDAL(url, username, password);
		response.setContentType("application/json"); 
		try
		{
			// get data fropm server
			List<AccidentDTO> data = dal.executeQuery(query);
			// json serialzie the data
			GsonBuilder builder = new GsonBuilder();
			Gson gson = builder.create();
			String stringiFiedData =  gson.toJson(data).toString();
			OutputStream output = response.getOutputStream();
			output.write(stringiFiedData.getBytes());
			
		}
		catch(Exception e)
		{
			System.out.println(e.getMessage());
			System.out.println(e.getStackTrace());
		}
		
		
	}

}

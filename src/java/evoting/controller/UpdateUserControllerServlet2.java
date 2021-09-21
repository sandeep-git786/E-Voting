/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package evoting.controller;

import evoting.dao.UserDAO;
import evoting.dto.UserDetails;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author sandeep
 */
public class UpdateUserControllerServlet2 extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            RequestDispatcher rd=null;
            HttpSession session=request.getSession();
            String userid=(String)session.getAttribute("userid");
            //String uid=(String)request.getParameter("uid");
            if(userid==null)
            {
              session.invalidate();
              response.sendRedirect("accessdenied.html");
              return;
            } 
            try
            {   
                UserDetails user=new UserDetails();
                user.setUserid(request.getParameter("uid"));
                user.setPassword(request.getParameter("pwd"));
                user.setUsername(request.getParameter("uname"));
                user.setAddress(request.getParameter("adr"));
                user.setCity(request.getParameter("city"));
                user.setEmail(request.getParameter("email"));
                user.setMobile(Long.parseLong(request.getParameter("mob"))); 
                boolean result=UserDAO.updateUser(user);
                if(result==true)
                    out.println("success");
                else
                    out.println("fail");
            }
            catch(SQLException ex)
            {
            request.setAttribute("exception",ex);
            //rd=request.getRequestDispatcher("showexception.jsp");          
            }
            finally
            {
             //   rd.forward(request, response);
            }
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

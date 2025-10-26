import io
from flask import Flask , request, url_for, redirect, render_template,Response, jsonify, session,make_response
from werkzeug.utils import secure_filename
from flask_mail import Mail, Message
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy as sa
import mysql.connector, bcrypt, random, os,csv,pdfkit, datetime, uuid
from authlib.integrations.flask_client import OAuth
from datetime import datetime, timedelta
from collections import defaultdict
from dotenv import load_dotenv
from sqlalchemy import text
from sqlalchemy.inspection import inspect
from sqlalchemy.orm import selectinload
from user_agents import parse
from flask_moment import Moment
import stripe,secrets,math,requests,pycountry,time
import logging,re,csv
from langchain_ollama.llms import OllamaLLM

app = Flask(__name__)
app.secret_key = os.urandom(24)

load_dotenv()
# Configuring llm model
model = OllamaLLM(model="llama3.2")



# Developing an chatbot using lang-chain developing an llm
@app.route("/chatbot",methods=["GET","POST"])
def chatbot():
      if request.method == "POST":
            user_input = request.json
            prompt = f"You are an Expert AI assistant. which satisfies the user queries. The user asked: {user_input}."
            # user_files = request.files[0]
            start_time = time.perf_counter()
            # Calculate the total time
            response = model.invoke(prompt)                 
            end_time = time.perf_counter()
            total_time = end_time - start_time
            print(f"Total Execution Time:- {total_time}") 
            return jsonify({"response": str(response)})
            
            
            
            
      
      return render_template("chatbot.html")


# Configuring logging
activity_logger = logging.getLogger("activity.log")
activity_logger.setLevel(logging.INFO)

# File handler for activity log
file_handler = logging.FileHandler("activity.log",encoding="utf-8")
file_handler.setLevel(logging.INFO)

# Log Formatting
formatter = logging.Formatter("%(asctime)s | %(message)s")
file_handler.setFormatter(formatter)

# Add handler to logger
activity_logger.addHandler(file_handler)



# Function to get the location based on the user IP address
def get_location():
      ip_address = "103.250.160.74"
      print(f"Public IP:- {ip_address}")
      
      response = requests.get(f"https://ipapi.co/{ip_address}/json")
      print(response)
      data = response.json()
      print(data)
      city = data.get("city")
      state = data.get("region")
      country_code = data.get("country")

      country = pycountry.countries.get(alpha_2=country_code).name if country_code else None
      return f"{city}, {state} , {country}" if city and state  and country  else "Unknown Location"
    

# Function which returns browser and device name
def get_device_info(user_agent):
      system_info = re.search(r"\((.*?)\)", user_agent)
      if system_info:
        details = system_info.group(1)
        if "Windows" in details:
            print( "Windows")
        elif "Mac OS" in details or "Macintosh" in details:
            print( "Mac OS")
        elif "Linux" in details:
            print( "Linux")
        elif "Android" in details:
            print( "Android")
        elif "iPhone" in details or "iPad" in details:
            print( "iOS")
      # browser detection
      if "Chrome" in user_agent:
            browser = "Chrome"
      elif "Firefox" in user_agent:
            browser = "Firefox"
      elif "Safari" in user_agent:
            browser ="Safari"
      else:
            browser = "Other"
      # Device detection
      user_agent = parse(user_agent)
     
      if user_agent.is_pc:
            device_name = "Laptop/Desktop"
      elif user_agent.is_mobile:
            device_name = "Mobile"
      elif user_agent.is_tablet:
            device_name = "Tablet"
      else:
            device_name = "Unknown"
      

      return device_name,browser

# Function which returns the status based on the action performed
def get_status(action, sensitive=False):
      return "Critical" if sensitive else "Normal"

# Logger function
def log_activity(user_agent,action_name, target_entity, sensitive=False):
      device_name, browser_name = get_device_info(user_agent)
      location = get_location()
      status = get_status(action_name,sensitive)
      timestamp = datetime.now().strftime("%d/%b/%Y %H:%M:%S")
      log_message = (
            f"Timestamp: {timestamp} | "
            f"Device: {device_name} | Browser: {browser_name} | "
            f"Action: {action_name} | Target: {target_entity} |"
            f"Status: {status} | Location: {location}"

      )
      # Storing the logs into the file
      activity_logger.info(log_message)
      print(f"[Logged]:- {log_message}")










oauth = OAuth(app)
google = oauth.register(
      name="google",
      client_id=os.getenv("CLIENT_ID"),
      client_secret=os.getenv("CLIENT_SECRET"),
      server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
      client_kwargs= {"scope": "openid profile email"})

# Handling & displaying real time difference of the inserted log 
moment = Moment(app)


# Configuring and setup Gmail Server to send emails
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USERNAME"] = "vrajeshmakwana93@gmail.com"
app.config["MAIL_PASSWORD"] = os.getenv("MAIL_APP_PASSWORD")
app.config["MAIL_USE_TLS"] = True
# app.config['TEMPLATES_AUTO_RELOAD'] = True

app.config["UPLOAD_FOLDER"] = os.getenv("UPLOAD_SERVER_PATH")
# app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB limit

# Creating Mail Object
mail = Mail(app)


# Logging each user session data in a dictionary
user_data = {}

# test Secret key for Stripe Payment
stripe.api_key = os.getenv("STRIPE_API_KEY")

# Creating routes for generating checkout payment functionality

      
            
      
      

#  For success url
@app.route("/success",methods=["GET"])
def success():
      return redirect(url_for("conf"))


   


app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("SQLALCHEMY_DATABASE_URI")

db = SQLAlchemy(app)
class products(db.Model):      
      Sr_No = db.Column(db.Integer, primary_key = True)
      Product_ID = db.Column(db.Integer, nullable = False)
      Product_name = db.Column(db.String(20), nullable = False)
      Product_Price = db.Column(db.Float(10,2) , nullable = False)
      Product_Image = db.Column(db.String(20), nullable = False)
      InStock = db.Column(db.Integer, nullable = False)
      available = db.Column(db.Integer, nullable = False)
      feature = db.relationship("product_features",backref="products")
      variant = db.relationship("product_variant",backref="products")
      images = db.relationship("product_images",backref="products")
      reviews = db.relationship("product_reviews",backref="products")
      colors = db.relationship("colors", backref="products")
      sizes = db.relationship("sizes", backref="products")

      # For bulk uploaing the constructor      
      def __init__(self, Product_ID, Product_name, Product_Price, Product_Image, InStock, available):
        self.Product_ID = Product_ID
        self.Product_name = Product_name
        self.Product_Price = Product_Price
        self.Product_Image = Product_Image
        self.InStock = InStock
        self.available = available
      


class admin(db.Model):
      Sr_No = db.Column(db.Integer, primary_key = True)
      Admin_Username = db.Column(db.String(20), nullable = False)
      Admin_Email = db.Column(db.String(200), nullable=False)
      Admin_Password = db.Column(db.String(20), nullable = False)

class user_login(db.Model):
      Sr_No = db.Column(db.Integer, primary_key = True)
      Username = db.Column(db.String(20), nullable = False)
      Email = db.Column(db.String(20), nullable = False)
      Password = db.Column(db.String(20),nullable = False,default = 0)
      Token = db.Column(db.String(20), nullable = False)
      Picture = db.Column(db.String(200), nullable=True)
      auth_provider = db.Column(db.String(30), nullable = False,default="local")
      is_register = db.Column(db.Integer,nullable = False)

class shopping_cart(db.Model):
      Sr_No = db.Column(db.Integer, primary_key = True)
      user_id = db.Column(db.Integer, nullable = False)
      Product_ID = db.Column(db.Integer, nullable = False)
      Product_Image = db.Column(db.String(20), nullable = False)
      Product_Name = db.Column(db.String(20), nullable = False)
      Product_Price = db.Column(db.Float(10,2) , nullable = False)
      Product_Quantity = db.Column(db.Integer, nullable = False)
      Total = db.Column(db.Float(10,2) , nullable = False)


class shipping_details(db.Model):
      Sr_No = db.Column(db.Integer, primary_key = True)
      user_id = db.Column(db.Integer, nullable = False)
      Name = db.Column(db.String(20), nullable=False)
      Address = db.Column(db.String(20), nullable=False)
      City = db.Column(db.String(20),nullable=False)
      Country = db.Column(db.String(20),nullable=False)
      Postcode = db.Column(db.Integer, nullable = False)
      Phone = db.Column(db.Integer, nullable = False)
      Email = db.Column(db.String(20),nullable=False)
      paymentMethod = db.Column(db.String(20),nullable=False)
      Instructions = db.Column(db.String(20),nullable=False)

      
class Orders(db.Model):
      Sr_No = db.Column(db.Integer, primary_key = True)
      customer_id = db.Column(db.Integer, nullable = False)
      customer_name = db.Column(db.String(20), nullable=False)
      orderID = db.Column(db.Integer, nullable = False)
      Product_Name = db.Column(db.String(20), nullable = False)
      Product_Image = db.Column(db.String(20), nullable = False)
      Product_Price = db.Column(db.Float(10,2) , nullable = False)
      Quantity = db.Column(db.Integer, nullable = False)
      OrderStatus = db.Column(db.String(20), nullable = False)
      Datetime = db.Column(db.DateTime, default=datetime.utcnow,nullable=True)
      def model_to_dict(obj):
            return {c.key: getattr(obj, c.key) for c in inspect(obj).mapper.column_attrs}

class product_variant(db.Model):
      id = db.Column(db.Integer, primary_key= True)
      product_id = db.Column(db.Integer,db.ForeignKey("products.Sr_No",ondelete="CASCADE") )
      Name = db.Column(db.String(255),nullable=False)
      SKU = db.Column(db.String(200), unique=True, nullable=False)
      Description = db.Column(db.String(200), nullable=False)
      Ratings = db.Column(db.Integer, nullable=False)
      Original_Price = db.Column(db.Integer, nullable=False)
      Discounted_Price = db.Column(db.Integer, nullable=False)
      Available = db.Column(db.Boolean, nullable = False )
        
class product_color_images(db.Model):
      Sr_No = db.Column(db.Integer, primary_key=True)
      product_id = db.Column(db.Integer, db.ForeignKey("products.Sr_No",ondelete="CASCADE"))
      Color = db.Column(db.String(200), nullable=False)
      main_image = db.Column(db.String(200), nullable=False)
      sub_image1 = db.Column(db.String(200), nullable=False)
      sub_image2 = db.Column(db.String(200), nullable=False)
      sub_image3 = db.Column(db.String(200), nullable=False)
      sub_image4 = db.Column(db.String(200), nullable=False)


class product_images(db.Model):
      id = db.Column(db.Integer, primary_key= True)
      product_id = db.Column(db.Integer, db.ForeignKey("products.Sr_No",ondelete="CASCADE"))
      url = db.Column(db.String(200), nullable=False)
      is_main = db.Column(db.Boolean, nullable=False)

class product_features(db.Model):
      id = db.Column(db.Integer, primary_key= True)
      product_id = db.Column(db.Integer, db.ForeignKey("products.Sr_No",ondelete="CASCADE"))
      feature = db.Column(db.String(100), nullable=False)

class product_reviews(db.Model):
      id = db.Column(db.Integer, primary_key= True)
      product_id = db.Column(db.Integer, db.ForeignKey("products.Sr_No",ondelete="CASCADE"))
      name = db.Column(db.String(200), nullable=False)
      user_id = db.Column(db.Integer)
      Rating = db.Column(db.Integer,nullable=False)
      feedback = db.Column(db.String(200), nullable=False)
      created_at = db.Column(db.DateTime,nullable=False,server_default=text("CURRENT_TIMESTAMP"))
      def to_dict(self):
        return {
            'name': self.name,
            'rating': self.Rating,
            "feedback": self.feedback
        }



class colors(db.Model):
      id = db.Column(db.Integer, primary_key= True)
      product_id = db.Column(db.Integer, db.ForeignKey("products.Sr_No",ondelete="CASCADE"))
      name = db.Column(db.String(100), nullable=False)

class sizes(db.Model):
      id = db.Column(db.Integer, primary_key= True)
      product_id = db.Column(db.Integer, db.ForeignKey("products.Sr_No",ondelete="CASCADE"))
      name = db.Column(db.String(100), nullable=False)





@app.route("/demo",methods=["GET"])
def email():
      return render_template("admin_EmailTemplate.html")

@app.route("/settings/<string:id>",methods = ["GET"])
def settings(id):
      user_data = db.session.query(user_login).filter_by(Token=id).first()
      return render_template("settings.html",token=id,name=user_data.Username,user=user_data)

@app.route("/profile/<string:id>",methods = ["GET"])
def profile(id):
      print(id)
      user_data = db.session.query(user_login).filter_by(Token=id).first()

      return render_template("profile.html",token=id,name=user_data.Username,user=user_data)

@app.route("/productDetail", methods=["GET"])
def productDetail():
      image = product_images.query.filter_by(is_main = 1).all()
      details = product_variant.query.all()
      print(F"ProductDetails Page Session:- {session}")
      return render_template("productList.html",current_page="productList",data=zip(image,details))

@app.route("/", methods=['GET', 'POST'])
def home():
      try:
            data = products.query.all()

      except Exception as e:
            return render_template("home.html", data = None )


      return render_template("home.html",data=data)

# ================ Adding orders Page to Admin Dashboard ========================
@app.route("/orders/<string:id>", methods = ["GET", "POST"])
def orders(id):
      try:
            user_orders = Orders.query.filter_by(customer_id=id).all() 
            user_detail = user_login.query.filter_by(Sr_No=id).first() 
            filtered_orders = defaultdict(list)
            # Grouping Products based on the Order ID setting key as the orderID and values as a list of orders
            for order in user_orders:
                  filtered_orders[order.orderID].append(order)
            print(filtered_orders)
            return render_template("orders.html", user_orders=filtered_orders,current_page="orders", user=user_detail)
      except Exception as e:
            print(f"Error:- {e}")
      return render_template("orders.html")

# ================ Fetching the Orders data and details ======================
@app.route("/fetchOrders/<id>/<order_id>", methods=["GET","POST"])
def fetch(id,order_id):
      data =  Orders.query.filter_by(orderID= order_id, customer_id = id).all()
      response = {}
      for item in data:
            if item.orderID not in response:
                  response[item.orderID] = []
            response[item.orderID].append(Orders.model_to_dict(item))
            print(response)
      return jsonify(response)


# ================ Updating Order Status to the database and in user dashboard ======================
@app.route("/UpdateStatus", methods =["POST"])
def UpdateStatus():
      if request.method == "POST":
            data = request.get_json()
            status = data.get("status")
            OrderID = data.get("OrderID")
            order = Orders.query.filter_by(orderID=OrderID).first()
            if not order:
                  return jsonify({"status":"placed","type":"error","message":"Something Went Wrong"})
            order.OrderStatus = status
            db.session.commit()
            print(f"user Order ID:- {OrderID}, user Updating Status:- {status}")
            return jsonify({"status":status,"type":"success","message": "Order Status Updated Successfully" })


# ================ Adding Customers Page to Admin Dashboard ========================
@app.route("/customers", methods = ["GET"])
def customers():
      data = user_login.query.all()
      image_urls = [
            "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",
            "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",
            "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",
            "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",
            "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop"
      ]
      print("Customer Page Session Values:- ",session)
      return render_template("customers.html",user = data,current_page="customers",images = image_urls)
# ================ Adding Analytics Page to Admin Dashboard ========================
@app.route("/analytics", methods = ["GET"])
def analytics():
      return render_template("analytics.html")

@app.route("/logs",methods=["GET"])
def admin_logs():
      print(f"Logs Page Session:- {session}")
      with open("activity.log","r",encoding="utf-8") as file:
            data = file.readlines()
            count_logs = len(data) # No of logs stored in these
            for d in data:
                  logs = d.split("|")
            

      return render_template("adminLogs.html",log_count_no = count_logs,data=data,current_page="logs")


# Adding Edit Button Functionality in Admin Dashboard
@app.route("/edit/<string:Sr_No>", methods = ["GET", "POST"])
def edit_product(Sr_No):

      if "Admin" in session and session["Admin"] == "admin":
            if request.method == "POST":
                  try:
                        req_pid = request.form.get("pid")
                        req_product_name = request.form.get("pname")
                        req_product_price = request.form.get("pprice")
                        req_product_image = request.files["pimg"]
                        req_product_stock = request.form.get("pstock")
                        print("Image Data:- ",req_product_image.filename) 
                        uploaded_img_path = None
                        if not req_product_image.filename == "":
                              full_image_path = os.path.join(app.config["UPLOAD_FOLDER"], secure_filename(req_product_image.filename.replace("\\","/")))
                              req_product_image.save(full_image_path)
                              # Real Path that can be inserted into the database
                              uploaded_img_path =  "/"+ full_image_path[31::].replace("\\","/")
                              print( req_product_image,"Full Image Path:- ",full_image_path,"UploadedImagePath:- ", uploaded_img_path)
                              
                        product = products.query.filter_by(Sr_No = Sr_No).first()
                        product.Product_ID = req_pid
                        product.Product_name = req_product_name
                        product.Product_Price = req_product_price
                        product.Product_Image =  uploaded_img_path  or product.Product_Image
                        product.InStock = req_product_stock
                        db.session.commit()
                        print(f"Edit Product Session:- {session}")

                        success = "Your Product is Edited Successfully"
                        log_activity(session["user_agent"],"Editing a Product Basic info","Products database table",sensitive=True)
                        return render_template("Editing_product.html", success = success, product = product)
                  except Exception as e:
                        return f"Error:- {e}"
      else:
            print("Session Expired")
      product = products.query.filter_by(Sr_No = Sr_No).first()
      return render_template("Editing_product.html", product = product)

@app.route("/demo", methods =["GET"])
def demo():
      subtotal = 100
      tax = subtotal * 0.8
      total = tax + subtotal
      return render_template("pdf.html",subtotal=subtotal,tax=tax,total=total)

# Exporting admin logs in a csv file
@app.route("/generateLogCSV",methods=["GET","POST"]) 
def generateLogCsv():
      try:
            with open("activity.log","r",encoding="utf-8") as file:
                  data = file.readlines()
            output = io.StringIO()
            writer = csv.writer(output,delimiter=",")
            writer.writerow(["Current DateTime","Device","Browser","Action","Target","Status","Location"])
            # Write Header
            for d in data:
                  logs = d.split("|")
                  writer.writerow([logs[1],logs[2],logs[3],logs[4],logs[5], logs[6],logs[7]])
            # Creating Response
            response = Response(output.getvalue(),mimetype="text/csv")
            response.headers["Content-Disposition"] = "attachement;filename=adminLog.csv"
            return response
                  
      except Exception as e:
            print(f"Error:- {e}")
      return jsonify({"CSV Data": data[0]})


# Creating PDF file of Admin Logs
@app.route("/generateLogPDF",methods=["GET","POST"])
def generateLogPDF():
      try:
            config = pdfkit.configuration(wkhtmltopdf="C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe")
            with open("activity.log","r",encoding="utf-8") as file:
                  data = file.readlines()
            html_log_content = render_template("pdfLog.html",logs = data)
            css_path = "E:/E-commerce Site using Flask/static/css/pdfLog.css"
            pdf = pdfkit.from_string(html_log_content,False,options={"page-size": "A4"}, css=css_path)
            response = make_response(pdf)
            response.headers['Content-Type'] = "application/pdf"
            response.headers['Content-Disposition'] = "inline;"
            return response
      except Exception as e:
            return f"Error:- {e}"
# Generating Invoices Statements in PDF Format
@app.route("/generatePDF", methods = ["GET","POST"])
def generate():
      try:
            products = [
            {"image": "http://127.0.0.1:5000/static/images/products/f1.jpg","item": "T-Shirt", "desc": "100% Cotton", "qty": 2, "price": 25.00},
            {"image": "http://127.0.0.1:5000/static/images/products/f5.jpg","item": "Jeans", "desc": "Blue Denim", "qty": 1, "price": 40.00},
            {"image": "http://127.0.0.1:5000/static/images/products/f6.jpg", "item": "Shoes", "desc": "Running", "qty": 1, "price": 60.00},
              ]
            subtotal = sum(p["qty"] * p["price"] for p in products)
            tax = subtotal * 0.08
            total = subtotal + tax
            css_path = "E:/E-commerce Site using Flask/static/css/pdf.css"
            html_content = render_template("pdf.html",products=products, subtotal=subtotal,tax=tax,total=total)
            # Code for generating and saving  pdf here
            # config = pdfkit.configuration(wkhtmltopdf="C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe")
            # pdfkit.from_string(html_content,"Invoice.pdf",configuration=config)
            # Method 2 :- Provides the Preview of the Pdf File and allows  user to download the file
            pdf = pdfkit.from_string(html_content,False,options={"page-size": "A4"}, css=css_path)
            response = make_response(pdf)
            response.headers['Content-Type'] = "application/pdf"
            response.headers['Content-Disposition'] = "inline;"
            return response
      except Exception as e:
            print("Error:- ",e)
            return render_template("pdf.html")

# Adding an Product to the Homepage using Admin Dashboard
@app.route("/addproduct", methods=["GET", "POST"])
def addproduct():
      if "Admin" in session and session["Admin"] == "admin":
            if request.method == "POST":
                  try:
                        req_pid = request.form.get("product-id")
                        req_pname = request.form.get("product-name")
                        req_price = request.form.get("product-price")
                        req_stock = request.form.get("stock-quantity")
                        file = request.files["file"]
                        print(req_price,req_pname)
                        full_image_path = os.path.join(app.config["UPLOAD_FOLDER"], secure_filename(file.filename))
                        # Real Path that can be inserted into the database
                        uploaded_img_path =  "/"+ full_image_path[31::]
                        file.save(full_image_path)
                        print( file,full_image_path, uploaded_img_path)
                        # Product New Record
                        record = products(Product_ID= req_pid,Product_name=req_pname,Product_Price=req_price,Product_Image=uploaded_img_path ,InStock = req_stock,available = 1)
                        db.session.add(record)
                        db.session.commit() 
                        log_activity(session["user_agent"],"Adding a Product","Products database table",sensitive=True)
                        success = "Product Added Successfully to the Webpage"
                        return render_template("addproduct.html", success= success)
                        
                        
                  
                        


                        # Dragging and dropping the image
                        # drag_file = request.files["image"]
                        # print(drag_file)
                        # full_image_path = os.path.join(app.config["UPLOAD_FOLDER"], secure_filename(drag_file.filename))
                        # # Real Path that can be inserted into the database
                        # uploaded_img_path = full_image_path[24::]
                        # drag_file.save(os.path.join(app.config["UPLOAD_FOLDER"], secure_filename(drag_file.filename)))
                        # print(full_image_path, uploaded_img_path,"\n Server Folder Path:-" )
                        # Product New Record
                        # record = products(Product_ID= req_pid,Product_name=req_pname,Product_Price=req_price,Product_Image=uploaded_img_path ,InStock = req_stock,available = 1)
                        # db.session.add(record)
                        # db.session.commit() 
                        # success = "Product Added Successfully to the Webpage"
                        # return render_template("addproduct.html", success= success)

                  except Exception as e:
                        print(f"Add product Session:- {session}")
                        db.session.rollback()
                        print(f"Error:- {e}")
            
      return render_template("addproduct.html")

# Bulk Product Uploader using csv file to add multiple products at once

def read_csv(filepath):
      records = []
      with open(filepath,newline='', encoding="utf-8") as csvfile:
            csv_reader = csv.DictReader(csvfile)
            for row in csv_reader:
                  record =products(row["Product_ID"],row["Product_name"],row["Product_Price"],
                  row["Product_Image"],row["InStock"],row["available"])
                  records.append(record)
            return records
            
@app.route("/bulkupload", methods = ["GET","POST"])
def upload_csv_file():
       if request.method == "POST":
             csv_file = request.files["csvFile"]
             full_path = os.path.join(app.config["UPLOAD_FOLDER"], secure_filename(filename=csv_file.filename))        
             csv_file.save(full_path)
             bulk_data = read_csv(full_path)
             db.session.bulk_save_objects(bulk_data)
             db.session.commit()  
             log_activity(session["user_agent"],"Adding Products using csv file","Products database table",sensitive=True)
             success = "Products Added Successfully to the Webpage"
             return render_template("addproduct.html", success= success) 
       else:        
            return render_template("addproduct.html")




# Deleting an Product from the Homepage and from the database using Admin Dashboard
@app.route("/delete/<string:Sr_No>", methods = ["GET"])
def delete(Sr_No):
      print(Sr_No,"Type of sno:- ", type(Sr_No))
      if "Admin" in session and session["Admin"] == "admin":
            try:
                  product = products.query.filter_by(Sr_No=Sr_No).first()
                  db.session.delete(product)
                  db.session.commit()
                  success = True
                  log_activity(session["user_agent"],"Deleting a Product","Products database table",sensitive=True)
                  return redirect(url_for("admindashboard", msg = success))
            except Exception as e:
                  print(f"Session Delete Product:- {session}")
                  return f"Error:- {e}"
      return render_template("admindashboard.html")
                  


# Creating Admin Login
@app.route("/admin", methods = ["GET", "POST"])
def verify():
      if request.method == "POST":
            data = admin.query.filter_by().first()
            username_input = request.form.get("admin_username")
            password_input = request.form.get("admin_password")
            if username_input == data.Admin_Username:
                  if bcrypt.checkpw(password_input.encode("UTF-8"), data.Admin_Password.encode("UTF-8")):
                        session["Admin"] = username_input
                        session['login_time'] = str(datetime.now().strftime("%A, %B %#d, %Y at %#I:%M %p"))
                        session['ip'] =   "103.250.162.74"
                        session['user_agent'] = request.headers.get("User-Agent")
                        log_activity(session["user_agent"],"Login","Admin Panel",sensitive=True)
                        print("Login Successful")

                        msg = Message(
                              subject="Security alert: login in a admin panel through a new device",
                              sender="vrajeshmakwana93@gmail.com",
                              recipients= [data.Admin_Email]
                        )
                        # Getting the location and city
                        location_info = get_location()
                        # Loading external HTML template

                        html_email_body = render_template("admin_EmailTemplate.html",
                                                          ip = session.get("ip","notFound"),
                                                          DateTime=session.get("login_time",datetime.now()),
                                                          geoinfo = location_info,
                                                          username= username_input)
                        msg.html = html_email_body
                       
                        # Attaching an image with the email
                        with app.open_resource("static/images/logo.png") as img:
                              msg.attach("logo.png","img/png",img.read(),"inline",
                                         headers={"Content-ID":"<logo>"})
                              
                        
                        # Sending an email
                        mail.send(msg)
                        print(f"Session when admin is login:- {session}")
                        return redirect(url_for("admindashboard"))
                  else:
                        print("Incorrect Password")
            else:
                  print("No Record Found")
      return render_template("form.html")


# Creating user google login
@app.route("/login/google",methods=["GET","POST"])     
def login_google():
      try:
            redirect_uri = url_for("authorize_google",_external=True)
            return google.authorize_redirect(redirect_uri)
      except Exception as e:
            app.logger.error(f"Error during login: {str(e)}")
            return "Error occured during login",500

@app.route("/authorize/google")
def authorize_google():
      token = google.authorize_access_token()
      userinfo_endpoint = google.server_metadata["userinfo_endpoint"]
      resp = google.get(userinfo_endpoint)
      user_info = resp.json()
      username = user_info["name"]
      email_id = user_info["email"]
      user_pic = user_info["picture"]
      user_token = user_info["sub"]
      user = user_login.query.filter_by(Username=username).first()
      if not user:
            user = user_login(Username=username,Email=email_id,Token=user_token,Picture = user_pic,auth_provider="google",is_register=1)
            db.session.add(user)
            db.session.commit()
      session["username"] = username
      session["oauth_token"]= token
      user.Token = user_token
      db.session.commit()
      return redirect(f"/dashboard/{user_token}/")


@app.route("/admindashboard", methods = ["GET","POST"])
def admindashboard():
      try:
            if "Admin" in session and  session["Admin"] == "admin" :
                  data = admin.query.filter_by().first()
                  success = request.args.get("msg")
                  products_data = products.query.filter_by().all()
                  customerCount = user_login.query.count()
                  order= Orders.query.all()
                  no_of_orders = sum(o.Quantity for o  in order)
                  return render_template("admindashboard.html",customers = customerCount,Count=no_of_orders, products = products_data ,current_page="admin",  name = data.Admin_Username, success=success)
            
      except Exception as e:
            print(f"Session:- {session}")
            print(f"Error:- {e}")
      return render_template("form.html")
@app.route("/adminlogout")  
def adminlogout():
      print(session)
      res = requests.get(f"https://ipapi.co/103.250.162.74/json")
      print(res)
      log_activity(session.get("user_agent","Unknown Device"),"Logout","Admin Panel",sensitive=True)
      return redirect("/")

@app.route("/login", methods = ["GET", "POST"])
def login():
      try:
            if request.method == "POST":
                  try:
                        # Connecting to  MySQL database 
                        connection = mysql.connector.connect(host="localhost", user="root", password="", database="e-commerce_website" )
                        cursor = connection.cursor()
                        query = "SELECT `is_register`, `Password`, `Email` FROM `user_login` WHERE `Username` = %s"
                        value = (request.form.get("username"),)
                        cursor.execute(query, value)
                        registered = cursor.fetchone()
                        if registered is None:
                              return render_template("form.html", register = True)

                        if registered[0] == 1: # This checks whether the user is registered and the record is stored in the database
                              password = request.form.get("password")
                              if bcrypt.checkpw(password.encode("UTF-8"), registered[1].encode("UTF-8")):
                                    access_token = str(uuid.uuid4())
                                    session["username"] = value[0]
                                    # Updating database user token
                                    user_data =  user_login.query.filter_by(Email= registered[2]).first()
                                    if not user_data.Token:
                                          print("Token is not available")
                                          user_data.Token = access_token
                                          db.session.commit()
                                          print("Token added successfully")
                                          session["Token"] = access_token
                                          # Unique cookie name per user
                                          cookie_name = f"user_auth_{value[0]}"

                                          response = make_response(redirect(f"/dashboard/{access_token}"))
                                          # # # Set the cookie with user info
                                          response.set_cookie(
                                                cookie_name,
                                                access_token,
                                                httponly=True,
                                                max_age=3600 # 1 hour 
                                          )
                                          return response
                        
                                    else:
                                          print("Token is Unavailable...")
                                          return render_template("Unauthorized.html",user=user_data,token=user_data.Token)
                                    
                                    
                              
                              else:
                                    return render_template("form.html", status = "fail")
                        else:
                             return render_template("about.html", register = True) 
                  except Exception as e:
                        print(f"Error:- {e}")
                        # return render_template("form.html", shutdown = e )                        
      except Exception as e:
            print(f"Error:- {e}")
      return render_template("form.html")   
      
# Creating Forgot Password
@app.route("/forgot", methods = ["GET", "POST"])
def send_email():
      if request.method == "POST":
            user_email = request.form.get("email")
            print(f"Email Type:- {type(user_email)} ")
            try:
                  msg = Message(subject="Verification From Cara",  sender= "vrajeshmakwana93@gmail.com", recipients= [user_email])
                  msg.html = f""" <h1>Verification From Cara</h1>
                  <p> Dear User! Please Verify your email <a href = "http://127.0.0.1:5000/updatepassword/{user_email}">Verify</a> </p>"""
                  mail.send(msg)
                  email_parts = user_email.split("@")
                  masked_Chars = email_parts[0].replace(email_parts[0][3:] , '*'*len(email_parts[0][1:]))
                  masked_email =  masked_Chars + '@'+email_parts[1]
                  session["email"] = masked_email
                  return redirect("/email")


            except Exception as e:
                  print(e)
      else:
            print("Error")
      return render_template("forgot(verification).html")



#  Email Page After Sending Email Message Page that Email is sended successfully
@app.route("/email")
def email_confirmation_message():
      return render_template("emailmessage.html",maskedEmail=session["email"])  


@app.route("/updatepassword/<string:email>", methods=["GET","POST"])
def updatePassword(email):
      if request.method == "POST":
            try:
                  # Connecting to  MySQL database 
                  connection = mysql.connector.connect(host="localhost", user="root", password="", database="e-commerce_website" )
                  cursor = connection.cursor()
                  pas =  request.form.get("password")
                  co_pas = request.form.get("confirm_password")
                  if pas == co_pas:
                        salt = bcrypt.gensalt()
                        new_hash_password  = bcrypt.hashpw(pas.encode("UTF-8"),salt)
                        query = "UPDATE `user_login` SET `Password`=%s WHERE `Email`=%s"
                        values = (new_hash_password, email)
                        cursor.execute(query, values)
                        connection.commit()
                        connection.close()
                        success = "The Password Changed Successfully!"
                        return render_template("ForgotPassword.html", success = success)

                  else:
                         err = "The Passwords Do not Match Please Enter Correct Password"
                         print(err)
                         return render_template("ForgotPassword.html", err = err)

            except Exception as e:
                  print("Error:- ",e)
                  
      return render_template("ForgotPassword.html", email = email)

@app.route("/dashboard/<string:id>/", methods = ["GET","POST"])

def userdashboard(id):
      if "username" in session:
            user_data = user_login.query.filter_by(Token = id).first()
            session["name"] = user_data.Username   
            pdata = products.query.all()
            # To display when from checkout page we move to homepage then to display the product count that's why the code is written
            cart_data = shopping_cart.query.filter_by(user_id=user_data.Sr_No).all()
            cart_sum = sum(c.Product_Quantity for c in cart_data) or 0
            print(f"Cart Total:- {cart_sum}")
            return render_template("userdashboard.html",CartTotalCount = cart_sum, user = user_data ,data = pdata, id=id)

      return redirect("/")

# For Searching the product and providing autocomplete suggestion
@app.route("/<string:id>/search/",methods=["GET","POST"])
def search(id):
      q = request.args.get("q")
      data=""
      if q:
            data = products.query.filter(products.Product_name.icontains(q)).all()
      return render_template("search.html",token=id,data=data)

@app.route("/about/<string:id>", methods=["GET", "POST"])
def about(id):
      user_data = user_login.query.filter_by(Token = id).first()
      return render_template("about.html", user=user_data, token=id, current_page="about")

@app.route("/shop/<string:id>/", methods=["GET","POST"])
def shop(id):
      user_data = user_login.query.filter_by(Token = id).first()
      no_of_products = 4
      product_data = products.query.all()
      page = request.args.get("page")
      print(f"Browser Page no:- {page}")

      print(int(no_of_products))
      if (not str(page).isdigit()):
            page=0
      last =  math.ceil(len(product_data)/int(no_of_products)) - 1
      page = int(page)
      
   
      if (page==0):
            prev = "#"
            next = f"/shop/{id}/?page={str(page+1)}"
      elif (page == last):
            prev = f"/shop/{id}/?page={str(page-1)}"
            next = "#"
      else:
            prev = f"/shop/{id}/?page={str(page-1)}"
            next = f"/shop/{id}/?page={str(page+1)}"
      
      # Slicing the products to display the limited no of products
      start = page * int(no_of_products) 
      end = (page * int(no_of_products) )+ int(no_of_products)
      # Displaying products as per setted 2 products for each new pagination
      product_data = product_data[start : end]

      return render_template("shop.html",user=user_data,products = product_data,prev=prev,next=next, token=id, current_page="shop")

@app.route("/blog/<string:id>", methods=["GET", "POST"])
def blog(id):
      user_data = user_login.query.filter_by(Token = id).first()
      return render_template("blog.html", user=user_data, token=id, current_page="blog")

@app.route("/contact/<string:id>", methods=["GET", "POST"])
def contact(id):
      user_data = user_login.query.filter_by(Token = id).first()
      return render_template("contact.html", user=user_data, token=id, current_page="contact")
# Creating Product Details Form to display products details dynamically to the user
@app.route("/ProductForm", methods =["GET"])
def ProductForm():
      print(f"session for Product Details:- {session}")
      return render_template("ProductForm.html",current_page="products")

# Getting product images based on the selected color btn
@app.route("/color",methods=["GET","POST"])
def color():
      colorName = request.json
      color_images = product_color_images.query.filter_by(Color = colorName).first()
      return jsonify({
            "mainImage": color_images.main_image,
            "subImg1": color_images.sub_image1,
            "subImg2": color_images.sub_image2,
            "subImg3": color_images.sub_image3 ,
            "subImg4": color_images.sub_image4 
            })



# Rendering Product Details Webpage
@app.route("/dashboard/<string:Token>/product/<string:pid>", methods=["GET"])
def product(Token,pid):
      results = db.session.query(products,product_features,colors,sizes).\
            select_from(products).join(product_features).join(colors).join(sizes).filter(products.Product_ID ==pid  ).all()
      if not results:
            return render_template("404.html",token=Token,)
      unique_features = set()
      unique_colors = set()
      unique_sizes = set()
      order = { "S":1,"M":2,"L":3,"XL":4}
     
      for pro,features,color,size in results:
            unique_features.add(features.feature)
            unique_colors.add(color.name)
            unique_sizes.add(size.name)
      final_size = sorted(list(unique_sizes),key=lambda x: order[x])
      details = product_variant.query.filter_by(product_id=pid).first()
      images = product_images.query.filter_by(product_id=pid).all()
      user = db.session.query(user_login).filter_by(Token= Token).first()
      reviews = product_reviews.query.filter_by(product_id=pid,user_id=user.Sr_No).all()
      return render_template("ProductDetails.html",token=Token,user=user,ProductDetails = details,images =images,reviews=reviews ,sizes = final_size,colors=unique_colors,features=unique_features)
# Generating csrf token
@app.route("/get-csrf-token", methods=["GET"])
def get_csrf_token():
      token = secrets.token_hex(16)
      session["csrf_token"] = token
      return jsonify({"csrf_token": token})


# Accepting and inserting user  feedback into datbase system to make it dynamic
@app.route("/submit-feedback",methods=["POST"])
def feedback():
      if request.method == "POST":
           csrf_token = request.headers["X-Csrf-Token"]
           if  csrf_token and csrf_token == session["csrf_token"]:
                 data =request.get_json()
                 id =  data.get("productID")
                 username = data.get("name")
                 rating = data.get("rating")
                 msg = data.get("text")
                 review = product_reviews(product_id= id , name=username,user_id=1,Rating= rating,feedback=msg)
                 db.session.add(review)
                 db.session.commit()
                 latest_review = product_reviews.query.filter_by(product_id=id).order_by(product_reviews.created_at.desc()).first()
                 return jsonify({"message": "Thanks for giving your feedback","data": latest_review.to_dict(),"status":200})               
           else:
                 return jsonify({"message": "Unauthorized user access","status": 401})
      return jsonify({"message": "not submitted"})

# Editing the product review which are provided by the user
@app.route("/editReview/<string:id>", methods=["GET","POST"])
def editReview(id):
      data = product_reviews.query.filter_by(id=id).first()
      if request.method == "POST":
            reviewer_name = request.form.get("name")
            reviewer_rating = request.form.get("rating")
            reviewer_opinion = request.form.get("review") 
            data.name = reviewer_name
            data.Rating = reviewer_rating
            data.feedback = reviewer_opinion
            print(data.user_id)
            try:
                  db.session.commit()
                  token = db.session.query(user_login.Token).filter_by(Sr_No=data.user_id).scalar()
                  return render_template("editReview.html",data=data,token=token,status = "Review Updated Successfully")
            except Exception as e:
                  print(f"Error:- {e}")
           
      return render_template("editReview.html",data=data)
# Deleting a user Feedback 
@app.route("/deleteReview/<string:id>", methods=["GET","POST"])
def deleteReview(id):
      data = product_reviews.query.filter_by(id=id).first()
      try:
            db.session.delete(data)
            db.session.commit()
            Token = db.session.query(user_login.Token).filter_by(Sr_No = 1).scalar()
            return redirect(f"/dashboard/{Token}/product")
      except Exception as e:
            print(f"Error:- {e}")
      return jsonify({"data": data.feedback})

# Creating user order Webpage
@app.route("/userorder/<string:id>", methods = ["GET", "POST"])

def show_order(id):
      # removing id= so that the complete token is extrated properly
      try:
            user_data = user_login.query.filter_by(Token = id).first()
            user_orders =  Orders.query.filter_by(customer_id = user_data.Sr_No).all()
            orders_cluster = defaultdict(list)
            for order in user_orders:
                  orders_cluster[order.orderID].append(order)
      except Exception as e:
            print("error:-",e)
      return render_template("user_orders.html",token=id, user = user_data, orders_cluster=orders_cluster, name=user_data.Username)

# Displaying user Order Status Page
@app.route("/order_status/<string:id>", methods =["GET"])
def show(id):
      order_status = Orders.query.filter_by(orderID = id).first()
      return render_template("userOrderStatus.html", orderStatus = order_status.OrderStatus)

@app.route("/checkout/<string:id>", methods = ["GET","POST"])
def checkout(id):
      try:
            # Finding the user ID through database
            user_data = user_login.query.filter_by(Token= id).first()
            product_data = shopping_cart.query.filter_by(user_id = user_data.Sr_No).all()
            subtotal = sum(subtotal.Product_Price for subtotal in product_data)
            total = sum(total.Total for total in product_data)
            print(subtotal)
      except Exception as e:
            return f"Error:- {e}"
      return render_template("checkout.html",product = product_data,subtotal=subtotal,user=user_data, token = id, total=total,user_id = user_data.Sr_No)


@app.route("/confirm", methods = ["GET","POST"])
def conf():
      if request.method == "POST":
            token = request.form.get("token")
            # Form data
            name = request.form.get("name")
            address = request.form.get("address")
            city = request.form.get("city")
            country = request.form.get("country")
            postcode = request.form.get("postcode")
            phone = request.form.get("phone")
            email = request.form.get("email")
            paymentMethod = request.form.get("r1")
            instruction = request.form.get("additional")
            try:
                  # Getting the specific user purchased product data
                  user_data = user_login.query.filter_by(Token = token).first()
                  data = shopping_cart.query.filter_by(user_id = user_data.Sr_No).all()
                  order_id = "ORD-" + str(random.randint(1111111111,9999999999))
                  
                  # Inserting shipment data into the database 
                  
                  shipping_data = shipping_details(user_id = user_data.Sr_No, Name = name,Address = address,
                  City = city,Country = country, Postcode = postcode,Phone = phone, Email = email,
                  paymentMethod = paymentMethod, Instructions= instruction )
                  db.session.add(shipping_data)
                  db.session.commit()
                   # Now inserting products ordered by the user in orders table
                  id =user_data.Sr_No
                  print(id)
                  for d in data: 
                        order_data = Orders(customer_id = user_data.Sr_No,customer_name=user_data.Username, orderID= order_id,Product_Name=d.Product_Name,
                        Product_Image = d.Product_Image, Product_Price = d.Product_Price,
                        Quantity = d.Product_Quantity,OrderStatus = "pending")
                        db.session.add(order_data)
                  db.session.commit()

                  # # Removing data from shopping cart after data is inserted in the order table
                  for delete in data:
                        db.session.delete(delete)
                  db.session.commit()
                  successmsg = "Order Placed Successfully"
                  

                  ship_data = shipping_details.query.filter_by(user_id=user_data.Sr_No).first()
                  order_data = Orders.query.filter_by(orderID = order_id ).all()
                  # Calculating subtotal and  of all products
                  subtotal = sum(price.Product_Price for price in order_data)
                  
                  total = sum(price.Product_Price * price.Quantity for price in order_data)
                  # Calculating Delivery Date
                  current_date = datetime.today().date()
                  delivery_date = current_date + timedelta(days=5)


                  session["total"] = total
                  session["subtotal"] = subtotal
                  session["oid"] = order_id
                  session["ddate"] = delivery_date.strftime("%a, %d %b %Y")
                  session["cdate"] = current_date.strftime("%a, %d %b %Y")
                  session["msg"] = successmsg
                  orders_data  = [ 
                        {
                              "Product_Image": o.Product_Image,
                              "Product_Price": o.Product_Price,
                              "Quantity": o.Quantity,
                        }
                  for o in order_data
                  ]
                  session["order_data"] = orders_data
                  session["ship_data"] = {
                        "Name": ship_data.Name,
                        "Address":ship_data.Address,
                        "City": ship_data.City,
                        "Postcode": ship_data.Postcode,
                        "Country": ship_data.Country,

                  }
                  session["token"] = token
                  print(session["ship_data"],session["order_data"],session["token"])
                  price_id = "price_1RvfmlFPhqHhqSAHtVYfldbm"
                  payment_session = stripe.checkout.Session.create(
                        payment_method_types=["card"],
                        line_items=[
                        {
                              "price": price_id,
                              "quantity":1,
                        }
                  ],
                        mode="payment",
                        success_url="http://127.0.0.1:5000/success",
                  )
                  return render_template("checkout.html",user=user_data,url=payment_session.url,) 
            except Exception as e:
                  print("Error:- ",e)
                  return render_template("checkout.html",error = e)
                  

      return render_template("confirmation.html",)




@app.route("/logout/<string:id>")
def logout(id):
      token = id
      user_data = user_login.query.filter_by(Token = token).first()
      user_data.Token = None
      db.session.commit()
      session.clear()
      return redirect("/login")





# Fetching Shopping cart data 
@app.route("/get-data/<string:id>", methods=["GET", "POST"]) 
def updated_count(id):
       print(id)
       no = int(id[-1])
       connection = mysql.connector.connect(host="localhost", user="root", password="", database="e-commerce_website" )
       cursor = connection.cursor()
       query = "SELECT * FROM `shopping_cart` WHERE `user_id` = %s "
       value = (no,)
       cursor.execute(query,value)
       user_details = cursor.fetchall()
       print(user_details)
       total_Quantity = sum(count[6] for count in user_details)
       print("Total:- ",total_Quantity)
       return jsonify(total_Quantity)

# Deleting Product Details Page
@app.route("/DeleteProductDetails/<string:id>",methods=["GET","POST"])
def DeleteProductDetails(id):
          product = db.session.query(products).options(
            selectinload(products.feature),
            selectinload(products.images),
            selectinload(products.colors),
            selectinload(products.sizes),
            selectinload(products.reviews),
            selectinload(products.variant)
      ).filter_by(Product_ID = id).first()
          try:
                  print(f"Product:- {product}")         
                  for feature in product.feature:
                        db.session.delete(feature)
                  for image in product.images:
                        db.session.delete(image)
                  for color in product.colors:
                        db.session.delete(color)
                  for size in product.sizes:
                        db.session.delete(size)
                  for review in product.reviews:
                        db.session.delete(review)
                  for variant in product.variant:
                        db.session.delete(variant)
                  db.session.commit()
                  success = "Product Details Page Deleted!"
          except Exception as e:
                print(f"Error:- {e}")
                success= e
          return render_template("productList.html",success=success)



# Editing Product Details Dynamically
@app.route("/editProductDetails/<string:id>",methods=["GET","POST"])
def edit_productDetails(id):
      product = db.session.query(products).options(
            selectinload(products.feature),
            selectinload(products.images),
            selectinload(products.colors),
            selectinload(products.sizes),
            selectinload(products.reviews),
            selectinload(products.variant)
      ).filter_by(Product_ID = id).first()
      if request.method == "POST":
             try:
                  #  Step 1:- First Editing the product details database table
                  product_name = request.form.get("pname")
                  product_sku = request.form.get("sku")
                  product_description = request.form.get("description")
                  product_ratings = request.form.get("ratings")
                  product_original_price = request.form.get("oprice")
                  product_discount_price = request.form.get("dprice")
                  Available = request.form.get("available")
                  if Available == "true":
                        Available = 1
                  else:
                        Available = 0
                  for db_pro in product.variant:
                        db_pro.product_id = id
                        db_pro.Name = product_name
                        db_pro.SKU = product_sku
                        db_pro.Description = product_description
                        db_pro.Ratings = product_ratings
                        db_pro.Original_Price = product_original_price
                        db_pro.Discounted_Price	 = product_discount_price
                        db_pro.Available = Available

                  #  Step 2:- Editing the product features table
                  product_features1 = request.form.get("features[]")
                  feature_insert_list = []
                  for f in product_features1.split(","):
                        feature_insert_list.append(product_features(product_id=id,feature= f))
                  for d in product.feature:
                        db.session.delete(d)
                  db.session.flush()
                  product.feature = feature_insert_list

                  # Step 3:- Editing the product colors and sizes  
                  product_sizes = request.form.getlist("sizes[]")
                  product_colors = request.form.getlist("colors[]")
                  color_insert_list = [colors(product_id=id,name= c) for c in product_colors]
                  size_insert_list = [sizes(product_id=id,name= s) for s in product_sizes]
                  #  Actual Editing Code
                  for s in product.sizes:
                        db.session.delete(s)
                  for c in product.colors:
                        db.session.delete(c)
                  db.session.flush()

                  product.sizes = size_insert_list
                  product.colors = color_insert_list

                  #  Step 4:- Editing the product images

                  main_img = request.files.get("mainImage")
                  sub_images = request.files.getlist("SubImage[]")
                  if main_img.filename == "" and  all(image.filename == "" for image in sub_images):
                        print("No Images are Uploaded for Editing")
                  elif not(main_img.filename == "") and all(image.filename == "" for image in sub_images) :
                        filepath = os.path.join(app.config["UPLOAD_FOLDER"], secure_filename(main_img.filename))
                        main_img.save(filepath)
                        product.images[0].url = filepath[filepath.index("/static"):] if "/static" in filepath else None

                        print("Main Image is Uploaded")
                  elif any(f.filename for f in sub_images) and main_img.filename == "" :
                        print("Sub Images",sub_images)
                        for index, image in enumerate(sub_images):
                              print(f"Image file name{image.filename}")
                              filepath = os.path.join(app.config["UPLOAD_FOLDER"], secure_filename(image.filename))
                              print(filepath)
                              if not filepath  == os.getenv("UPLOAD_SERVER_PATH"):
                                    image.save(filepath)
                                    product.images[index + 1].url = filepath[filepath.index("/static"):] if "/static" in filepath else None
                        print("Sub Images are Uploaded")
                  else:
                        image_insert_list = [main_img,*sub_images]
                        for index, image in enumerate(image_insert_list):
                              filepath = os.path.join(app.config["UPLOAD_FOLDER"], secure_filename(image.filename))
                              image.save(filepath)
                              product.images[index].url = filepath[filepath.index("/static"):] if "/static" in filepath else None
                  db.session.commit()
                  return render_template("editProductDetails.html",status = "Product Updated Successfully",data = product)

             except Exception as e:
                  print(f"Error:- {e}")
       
      return render_template("editProductDetails.html",data = product)

# Inserting Product Details Dynamically
@app.route("/productData",methods=["GET","POST"])
def productData():
      if request.method == "POST":

            # Step 1:-  Inserting the data into first product_variant table
            product_id = request.form.get("id")
            SKU = request.form.get("sku")
            product_name = request.form.get("pname")
            product_description = request.form.get("productDescription")
            Ratings = request.form.get("rating")
            original_price = request.form.get("originalPrice")
            discounted_Price = request.form.get("discountedPrice")
            Available = request.form.get("available")
            try:
                  if Available == "true":
                        Available = 1
                  else:
                        Available = 0
                  product_details = product_variant(
                        product_id=product_id,
                        SKU=SKU,
                        Name=product_name,
                        Description = product_description, 
                        Ratings=Ratings,
                        Original_Price= int(original_price),
                        Discounted_Price= int(discounted_Price),
                        Available=Available,
                        ) 
                  db.session.add(product_details)
                  db.session.commit()

                  # Step 2:- Inserting the data into colors and sizes table
                  Colors = request.form.getlist("colors[]")
                  Sizes = request.form.getlist("sizes[]")

                  for color in Colors:
                        product_color = colors(product_id=product_id,name=color)
                        db.session.add(product_color)
                        db.session.commit()
                  for size in Sizes:
                        product_sizes = sizes(product_id=product_id,name=size)
                        db.session.add(product_sizes)
                        db.session.commit()
                  
                  # Step 3:- Inserting the image data into images table
                  main_img = request.files.get("mainImage")
                  sub_images = request.files.getlist("subImage[]")
                  # print(sub_images)
                  if main_img:
                        filepath = os.path.join(app.config["UPLOAD_FOLDER"], secure_filename(main_img.filename))
                        main_img.save(filepath)
                        images = product_images(product_id=product_id,url=filepath[filepath.index("/static"):]if "/static" in filepath else None,is_main=1)
                        db.session.add(images)
                        db.session.commit()
                  for image in sub_images:
                        filepath1 = os.path.join(app.config["UPLOAD_FOLDER"] ,secure_filename(image.filename))
                        image.save(filepath1)
                        image = product_images(product_id=product_id,url=filepath1[filepath1.index("/static"):]if "/static" in filepath1 else None ,is_main=0)
                        db.session.add(image)
                        db.session.commit()
                  # Step 4:- Inserting the product features into features table
                  features = request.form.get("features")
                  for feature in features.split(","):
                        feature = feature.replace("[","").replace("]","")
                        feature = feature[1:-1]
                        insert_features = product_features(product_id=product_id,feature=feature)
                        db.session.add(insert_features)
                        db.session.commit()
                  msg = " Product Details added  successfully"
            except Exception as e:
                  return f"Error:- {e}"

      return render_template("ProductForm.html",success=msg)
# Add To Cart Functionality
@app.route("/submit", methods=["GET","POST"])
def FetchingData():
    product_details = request.json
    product_id = int(product_details["id"])
    # Establish a single connection and cursor for the operation
    connection = mysql.connector.connect(host="localhost", user="root", password="", database="e-commerce_website")
    cursor = connection.cursor()

    # Check if the product already exists in the cart
    try:
       select_query = "SELECT `Product_Quantity`, `Product_Price` FROM  `shopping_cart` WHERE `Product_ID` = %s"
       cursor.execute(select_query, (product_id,))
       result = cursor.fetchone()
    except Exception as e:
              return f"Error Occured:- {e}"
          
    
    print(result)
    if result:
        # Product exists, update quantity and price
        current_quantity = result[0]
        current_price = result[1]

        # Calculate new quantity and price
        new_quantity = current_quantity + int(product_details["quantity"])
        new_price = current_price * new_quantity 
       #  Using try except in order to handle the exceptions
        try:
              # Update the existing record
              update_query = "UPDATE `shopping_cart` SET `Product_Quantity` = %s, `Total` = %s WHERE `Product_ID` = %s"
              cursor.execute(update_query, (new_quantity, new_price, product_id))
              connection.commit()
              print("Data Updated Successfully")
        except Exception as e:
              return f"Error Occured:- {e}"

    else:
        # Product does not exist, insert a new record
        try:
            result = user_login.query.filter_by(Username = session["username"]).first()
            values = (result.Sr_No,product_id, product_details["image"], product_details["name"], int(product_details["price"]), int(product_details["quantity"]),int(product_details["price"] * product_details["quantity"]))
            query = "INSERT INTO `shopping_cart`(`user_id`,`Product_ID`,`Product_Image`, `Product_Name`, `Product_Price`, `Product_Quantity`, `Total`) VALUES (%s,%s,%s,%s,%s,%s,%s)"
            cursor.execute(query, values)
            connection.commit()
            print("Data is inserted Successfully")
        
        except Exception as e:
              return f"Error Occured:- {e}"
        finally:
            #  Commit the transaction and close resources
            cursor.close()
            connection.close()

    return jsonify(product_details)

@app.route("/cart/<string:id>", methods = ["GET","POST"])
def cart(id):
       try:
              print(id)
              user_data  = user_login.query.filter_by(Token = id).first()
              cart_details = shopping_cart.query.filter_by(user_id= user_data.Sr_No).all()
              print(cart_details)
              no_record =len(cart_details)
              totalPrice = sum(order.Total for order in cart_details)
              #  Storing and sending user cart total
              print(totalPrice)
              print(no_record)
       except Exception as e:
             return f"Error:- {e}"
       return render_template("cart.html",token = id, user=user_data, product_data = cart_details,total = totalPrice)

# Updating product cart details and displaying it
@app.route("/cartUpdate",methods = ["GET","POST"])
def cartUpdate():
      if request.method == "POST":
            data = request.json
            Cart_data = shopping_cart.query.filter_by(Product_ID = data["pid"]).first()
            cart_details = shopping_cart.query.all()
            UpdatedProductPrice = int(Cart_data.Product_Price) * int(data["UpdatedQuantity"])
            print("Updated Price",UpdatedProductPrice)
            print("Updated Quantity",data["UpdatedQuantity"])
            # Updating the cart data into the database
            Cart_data.Total = UpdatedProductPrice
            Cart_data.Product_Quantity = data["UpdatedQuantity"] 
            db.session.commit()
            totalPrice = sum(order.Total for order in cart_details)
            return jsonify({"Total":totalPrice,"ProductTotal": UpdatedProductPrice})
      return jsonify({"Update":"Success"})

# Checking After Removing Product Data from the cart
@app.route("/CountItem",methods=["POST"])
def CountProducts():
      return jsonify({"ProductCounts": len(shopping_cart.query.all())})

# Removing Product data from cart table
@app.route("/removeItem", methods = ["GET", "POST"])
def remove():
       value = request.json
       no = [int(value) or 0]
       # Now Establishing a connection With MySQL database and sending form data to database
       connection = mysql.connector.connect(host="localhost", user="root", password="", database="e-commerce_website" )
       cursor = connection.cursor()

       try:
             query = "DELETE FROM `shopping_cart` WHERE `Product_ID` = %s"
             cursor.execute(query,no)
             connection.commit()

             print("Data Deleted Successfully")
             # Resetting the serial no
             cursor.execute("SET @count = 0;")
             cursor.execute("UPDATE `shopping_cart` SET `Sr_No` = @count:= @count+1")
             print("Serial No Reintialized")
             # Commit the transaction and close resources
             connection.commit()
             data = shopping_cart.query.all()
             total = sum(d.Total  for d in data)
             print(f"Database Product Total:- {total}")
                   
             cursor.close()
             connection.close()

    
       except mysql.connector.Error as err:
              print(f"Error: {err}")
       
       
       return jsonify({"value":value,"total":total})

@app.route("/register", methods=["GET","POST"])

def registration():
            if request.method == "POST":
                  try:
                        username = request.form.get("username")
                        password = request.form.get("password")
                        Salt = bcrypt.gensalt()
                        email = request.form.get("email")
                        register = 1
                        hash_password = bcrypt.hashpw(password.encode("UTF-8"), Salt)
                        data = user_login(Username = username,Password = hash_password,Email = email,is_register = register)
                        db.session.add(data)
                        db.session.commit()
                       
                        print("Data is inserted Successfully")
                        return render_template("registerform.html", register = register)
                        
                  except Exception as e:
                        return f"Error:- {e}"
            return render_template("registerform.html")


      
if __name__ == "__main__":
      app.run(debug=True)
      # The below line is for opening flask server in mobile phone
      # app.run(debug=True, host="0.0.0.0")
 # The Below method also works 
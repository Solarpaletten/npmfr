const getProducts = async (req, res) => {
 try {
   const products = await req.prisma.products.findMany({
     select: {
       id: true,
       code: true,
       name: true,
       unit: true,
       created_at: true,
       updated_at: true
     }
   });

   res.json(products);
 } catch (error) {
   res.status(500).json({ error: error.message });
 }
};

const getProduct = async (req, res) => {
 const { id } = req.params;

 try {
   const product = await req.prisma.products.findUnique({
     where: { id: Number(id) }
   });

   if (!product) {
     return res.status(404).json({ message: "Product not found" });
   }

   res.json(product);
 } catch (error) {
   res.status(500).json({ error: error.message });
 }
};

const createProduct = async (req, res) => {
 try {
   const { code, name, unit } = req.body;

   if (!code || !name) {
     return res.status(400).json({
       message: "Code and name are required",
       received: { code, name }
     });
   }

   const newProduct = await req.prisma.products.create({
     data: {
       code,
       name,
       unit
     }
   });

   res.status(201).json(newProduct);
 } catch (error) {
   res.status(500).json({ error: error.message });
 }
};

const updateProduct = async (req, res) => {
 const { id } = req.params;
 const { code, name, unit } = req.body;

 try {
   const updatedProduct = await req.prisma.products.update({
     where: { id: Number(id) },
     data: {
       code,
       name,
       unit,
       updated_at: new Date()
     }
   });

   res.json(updatedProduct);
 } catch (error) {
   if (error.code === "P2025") {
     return res.status(404).json({ message: "Product not found" });
   }
   res.status(500).json({ error: error.message });
 }
};

const deleteProduct = async (req, res) => {
 const { id } = req.params;

 try {
   await req.prisma.products.delete({
     where: { id: Number(id) }
   });

   res.json({ message: "Product deleted" });
 } catch (error) {
   if (error.code === "P2025") {
     return res.status(404).json({ message: "Product not found" });
   }
   res.status(500).json({ error: error.message });
 }
};

module.exports = {
 getProducts,
 getProduct,
 createProduct,
 updateProduct,
 deleteProduct
};
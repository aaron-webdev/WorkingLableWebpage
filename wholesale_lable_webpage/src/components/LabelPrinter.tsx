import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const productList = {
  'SOURDOUGH': {
    ingredients: 'WHEAT FLOUR, RYE FLOUR, SALT, WATER',
    tips: 'TIP: SLICE YOUR BREAD BEFORE FREEZING IT SO YOU CAN REHEAT IT BY THE SLICE- FIRST TOAST WILL REFRESH YOUR BREAD, SECOND TOAST WILL TOAST YOUR BREAD',
    disclaimer: 'NO PRESERVATIVES- USE OR FREEZE WITHIN 5 DAYS FOR BEST FRESHNESS',
    shelfLife: 5,
  },
  'CHEDDAR JALAPENO SOURDOUGH': {
    ingredients: 'WHEAT FLOUR, RYE FLOUR, SALT, WATER, CHEDDAR, JALAPENO',
    tips: 'TIP: SLICE YOUR BREAD BEFORE FREEZING IT SO YOU CAN REHEAT IT BY THE SLICE- FIRST TOAST WILL REFRESH YOUR BREAD, SECOND TOAST WILL TOAST YOUR BREAD',
    disclaimer: 'NO PRESERVATIVES- USE OR FREEZE WITHIN 5 DAYS FOR BEST FRESHNESS',
    shelfLife: 5,
  },
  'GARLIC HERB SOURDOUGH': {
    ingredients: 'WHEAT FLOUR, RYE FLOUR, SALT, WATER, GARLIC, HERB DE PROVENCE',
    tips: 'TIP: SLICE YOUR BREAD BEFORE FREEZING IT SO YOU CAN REHEAT IT BY THE SLICE- FIRST TOAST WILL REFRESH YOUR BREAD, SECOND TOAST WILL TOAST YOUR BREAD',
    disclaimer: 'NO PRESERVATIVES- USE OR FREEZE WITHIN 5 DAYS FOR BEST FRESHNESS',
    shelfLife: 5,
  },
  'CRANBERRY ROSEMARY SOURDOUGH': {
    ingredients: 'WHEAT FLOUR, RYE FLOUR, SALT, WATER, CRANBERRY, ROSEMARY',
    tips: 'TIP: SLICE YOUR BREAD BEFORE FREEZING IT SO YOU CAN REHEAT IT BY THE SLICE- FIRST TOAST WILL REFRESH YOUR BREAD, SECOND TOAST WILL TOAST YOUR BREAD',
    disclaimer: 'NO PRESERVATIVES- USE OR FREEZE WITHIN 5 DAYS FOR BEST FRESHNESS',
    shelfLife: 5,
  },
  'RYE SOURDOUGH': {
    ingredients: 'WHEAT FLOUR, RYE FLOUR, SALT, WATER, CARAWAY SEEDS',
    tips: 'TIP: SLICE YOUR BREAD BEFORE FREEZING IT SO YOU CAN REHEAT IT BY THE SLICE- FIRST TOAST WILL REFRESH YOUR BREAD, SECOND TOAST WILL TOAST YOUR BREAD',
    disclaimer: 'NO PRESERVATIVES- USE OR FREEZE WITHIN 5 DAYS FOR BEST FRESHNESS',
    shelfLife: 5,
  },
  'HONEY OAT': {
    ingredients: 'WHEAT FLOUR, WATER, YEAST, HONEY, MILK, OAT, SALT, BUTTER',
    tips: 'TIP: SLICE YOUR BREAD BEFORE FREEZING IT SO YOU CAN REHEAT IT BY THE SLICE- FIRST TOAST WILL REFRESH YOUR BREAD, SECOND TOAST WILL TOAST YOUR BREAD',
    disclaimer: 'NO PRESERVATIVES- USE OR FREEZE WITHIN 5 DAYS FOR BEST FRESHNESS',
    shelfLife: 5,
  },
  'WHOLE WHEAT': {
    ingredients: 'WHEAT FLOUR, SALT, WATER, SUGAR, YEAST, BUTTER',
    tips: 'TIP: SLICE YOUR BREAD BEFORE FREEZING IT SO YOU CAN REHEAT IT BY THE SLICE- FIRST TOAST WILL REFRESH YOUR BREAD, SECOND TOAST WILL TOAST YOUR BREAD',
    disclaimer: 'NO PRESERVATIVES- USE OR FREEZE WITHIN 5 DAYS FOR BEST FRESHNESS',
    shelfLife: 5,
  },
  'WHITE WHEAT': {
    ingredients: 'WHEAT FLOUR, SALT, WATER, SUGAR, YEAST, CANOLA OIL',
    tips: 'TIP: SLICE YOUR BREAD BEFORE FREEZING IT SO YOU CAN REHEAT IT BY THE SLICE- FIRST TOAST WILL REFRESH YOUR BREAD, SECOND TOAST WILL TOAST YOUR BREAD',
    disclaimer: 'NO PRESERVATIVES- USE OR FREEZE WITHIN 5 DAYS FOR BEST FRESHNESS',
    shelfLife: 5,
  },
  'BUTTERMILK BISCUIT': {
    ingredients: 'WHEAT FLOUR, BUTTER, BAKING POWDER, SALT, BUTTERMILK, EGG',
    tips: '',
    disclaimer: 'NO PRESERVATIVES EVER',
    shelfLife: 5,
  },
  'BIG BOI RICH CHOCOLATE CHIP': {
    ingredients: 'semi-sweet chocolate chips (sugar, chocolate liquor, milkfat, cocoa butter, soy lecithin), brown sugar, butter, all-purpose flour (unbleached hard red wheat flour, malted barley flour), sugar, eggs, baking soda, salt, cornstarch',
    tips: '',
    disclaimer: 'CONTAINS: wheat, soy, dairy, egg',
    shelfLife: 7,
  },
  'BIG BOI CHOCOLATE WALNUT CHUNK': {
    ingredients: 'semi-sweet chocolate chips (sugar, chocolate liquor, milkfat, cocoa butter, soy lecithin), brown sugar, butter, all-purpose flour (unbleached hard red wheat flour, malted barley flour), walnuts, sugar, eggs, baking soda, salt, cornstarch',
    tips: '',
    disclaimer: 'CONTAINS: wheat, soy, dairy, egg',
    shelfLife: 7,
  },
  'BIG BOI DOUBLE CHOCOLATE CHUNK': {
    ingredients: 'semi-sweet chocolate chips (sugar, chocolate liquor, milkfat, cocoa butter, soy lecithin), brown sugar, butter, all-purpose flour (unbleached hard red wheat flour, malted barley flour), sugar, eggs, cocoa powder, baking soda, salt, cornstarch',
    tips: '',
    disclaimer: 'CONTAINS: wheat, soy, dairy, egg',
    shelfLife: 7,
  },
};

const wholesalers = ['Local Market', 'Fresh Foods Co.', 'Bakery Supply Inc.', 'Organic Distributors', 'Custom'];

const LabelPrinter: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedWholesaler, setSelectedWholesaler] = useState<string>('');
  const [printDate] = useState(new Date().toLocaleDateString('en-US'));

  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'Bread Label',
    pageStyle: `
      @page {
        size: 2in 1.25in;   /* Adjust this to match your actual label size */
        margin: 0;
      }
      @media print {
        body { margin: 0; }
        .no-print { display: none; }
      }
    `,
  });

  const isFormComplete = selectedProduct && selectedWholesaler && quantity >= 1;

  const productData = productList[selectedProduct as keyof typeof productList];

  // Handle quantity from number input
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setQuantity(Math.max(1, Math.min(50, value)));
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '650px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '25px' }}>Wholesale Label Printer</h1>

      <div style={{ display: 'grid', gap: '20px' }}>
        {/* Product Selection */}
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
            Product:
          </label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
          >
            <option value="">-- Select Product --</option>
            {Object.keys(productList).map((prod) => (
              <option key={prod} value={prod}>
                {prod}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity - Dual Input */}
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
            Quantity (type the number you want to print):
          </label>
          <div style={{ display: 'flex', gap: '12px' }}>
            {/* Number Input */}
            <input
              type="number"
              min={1}
              max={50}
              value={quantity}
              onChange={handleQuantityChange}
              style={{
                flex: 1,
                padding: '10px',
                fontSize: '16px',
                width: '120px',
              }}
            />
          </div>
        </div>

        {/* Wholesaler Selection */}
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
            Wholesaler:
          </label>
          <select
            value={selectedWholesaler}
            onChange={(e) => setSelectedWholesaler(e.target.value)}
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
          >
            <option value="">-- Select Wholesaler --</option>
            {wholesalers.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Print Button */}
      <button
        onClick={handlePrint}
        disabled={!isFormComplete}
        style={{
          marginTop: '30px',
          width: '100%',
          padding: '14px',
          fontSize: '18px',
          backgroundColor: isFormComplete ? '#007bff' : '#cccccc',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: isFormComplete ? 'pointer' : 'not-allowed',
          fontWeight: 'bold',
        }}
      >
        Print {quantity} Label{quantity > 1 ? 's' : ''}
      </button>

      {/*Printable Content */}
      {productData && (
        <div style={{ display: 'none' }}>
          <div ref={componentRef}>
            {Array.from({ length: quantity }).map((_, index) => (
              <div
                key={index}
                style={{
                  width: '2in',
                  height: '1.25in',
                  padding: '0.12in',
                  border: '1px dashed #ccc',
                  margin: '15px auto',
                  fontSize: '9.5pt',
                  lineHeight: '1.25',
                  pageBreakAfter: index < quantity - 1 ? 'always' : 'avoid',
                  fontFamily: 'Arial, sans-serif',
                }}
              >
                <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '11pt', marginBottom: '5px' }}>
                  {selectedProduct}
                </div>

                <div style={{ fontSize: '8.5pt', marginBottom: '5px' }}>
                  <strong>Ingredients:</strong><br />
                  {productData.ingredients}
                </div>

                {productData.tips && (
                  <div style={{ fontSize: '8pt', marginBottom: '5px' }}>
                    {productData.tips}
                  </div>
                )}

                <div style={{ fontSize: '8.5pt', marginBottom: '6px' }}>
                  <strong>Disclaimer:</strong><br />
                  {productData.disclaimer}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8pt' }}>
                  <span>Best by: +{productData.shelfLife} days</span>
                  <span>{printDate}</span>
                </div>

                <div style={{ textAlign: 'center', fontSize: '8pt', marginTop: '8px' }}>
                  {selectedWholesaler}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <p style={{ marginTop: '25px', fontSize: '14px', color: '#555', textAlign: 'center' }}>
        <strong>Tip:</strong> In the print dialog, select your thermal printer and choose <em>Actual size</em> or 100% scale.
      </p>
    </div>
  );
};

export default LabelPrinter;
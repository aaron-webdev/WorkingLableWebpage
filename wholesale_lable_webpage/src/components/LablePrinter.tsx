import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const productList: Record<string, {
  ingredients: string;
  tips: string;
  disclaimer: string;
  shelfLife: number;
}> = {
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
    shelfLife: 0,
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
        size: 2in 1.25in;   /* Adjust to your label size: e.g. 2in x 1.25in or 4in x 2in */
        margin: 0;
      }
      @media print {
        body { margin: 0; }
        .no-print { display: none; }
      }
    `,
  });

  const isFormComplete = selectedProduct && selectedWholesaler && quantity > 0;

  const productData = productList[selectedProduct];

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Bread Label Printer</h2>

      <div style={{ display: 'grid', gap: '15px', marginBottom: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Product:
          </label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
          >
            <option value="">-- Select Product --</option>
            {Object.keys(productList).map((prod) => (
              <option key={prod} value={prod}>{prod}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Quantity (1–50):
          </label>
          <input
            type="number"
            min={1}
            max={50}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Wholesaler:
          </label>
          <select
            value={selectedWholesaler}
            onChange={(e) => setSelectedWholesaler(e.target.value)}
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
          >
            <option value="">-- Select Wholesaler --</option>
            {wholesalers.map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handlePrint}
        disabled={!isFormComplete}
        style={{
          padding: '12px 24px',
          fontSize: '18px',
          backgroundColor: isFormComplete ? '#007bff' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isFormComplete ? 'pointer' : 'not-allowed',
          width: '100%',
        }}
      >
        Print Labels ({quantity})
      </button>

      {/* Hidden printable label */}
      {productData && (
        <div style={{ display: 'none' }}>
          <div ref={componentRef}>
            {Array.from({ length: quantity }).map((_, index) => (
              <div
                key={index}
                style={{
                  width: '2in',           // Change to match your label width
                  height: '1.25in',       // Change to match your label height
                  padding: '0.1in',
                  border: '1px dashed #ccc',
                  margin: '10px auto',
                  fontSize: '10pt',
                  lineHeight: '1.2',
                  pageBreakAfter: index < quantity - 1 ? 'always' : 'avoid',
                  fontFamily: 'Arial, sans-serif',
                }}
              >
                <div style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '4px' }}>
                  {selectedProduct}
                </div>

                <div style={{ fontSize: '9pt', marginBottom: '4px' }}>
                  <strong>Ingredients:</strong><br />
                  {productData.ingredients}
                </div>

                {productData.tips && (
                  <div style={{ fontSize: '8pt', marginBottom: '4px' }}>
                    {productData.tips}
                  </div>
                )}

                <div style={{ fontSize: '9pt', marginBottom: '4px' }}>
                  <strong>Disclaimer:</strong><br />
                  {productData.disclaimer}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8pt' }}>
                  <span>Best by: +{productData.shelfLife} days</span>
                  <span>{printDate}</span>
                </div>

                <div style={{ textAlign: 'center', fontSize: '8pt', marginTop: '6px' }}>
                  {selectedWholesaler}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <p style={{ marginTop: '20px', fontSize: '14px', color: '#555' }}>
        <strong>Printing instructions:</strong> When the print dialog appears, select your thermal label printer, choose <em>Actual size</em> or 100% scale, and disable headers/footers.
      </p>
    </div>
  );
};

export default LabelPrinter;
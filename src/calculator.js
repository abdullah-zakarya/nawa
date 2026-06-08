import { CONFIG } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
  const calculatorForm = document.getElementById('calculatorForm');
  const genderInputs = document.querySelectorAll('input[name="gender"]');
  const hipInputGroup = document.getElementById('hipInputGroup');
  const resultsCard = document.getElementById('resultsCard');
  const bfResult = document.getElementById('bfResult');
  const bfText = document.getElementById('bfText');
  const targetCaloriesEl = document.getElementById('targetCalories');
  const bmrResultEl = document.getElementById('bmrResult');
  const tdeeResultEl = document.getElementById('tdeeResult');
  
  const macroProteinEl = document.getElementById('macro-protein');
  const macroProteinKcalEl = document.getElementById('macro-protein-kcal');
  const barProtein = document.getElementById('bar-protein');

  const macroCarbsEl = document.getElementById('macro-carbs');
  const macroCarbsKcalEl = document.getElementById('macro-carbs-kcal');
  const barCarbs = document.getElementById('bar-carbs');

  const macroFatsEl = document.getElementById('macro-fats');
  const macroFatsKcalEl = document.getElementById('macro-fats-kcal');
  const barFats = document.getElementById('bar-fats');

  const whatsappCalcBtn = document.getElementById('whatsapp-calc-btn');
  const progressCircle = document.querySelector('.progress-ring__circle');

  // Toggle Hip input group based on gender
  genderInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      if (e.target.value === 'female') {
        hipInputGroup.classList.remove('hidden');
      } else {
        hipInputGroup.classList.add('hidden');
      }
    });
  });

  // Calculate body fat percent and other health metrics
  window.calculateResults = function() {
    // Basic inputs
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activity = parseFloat(document.getElementById('activity').value);
    const goal = document.querySelector('input[name="goal"]:checked').value;

    // Measurement inputs (optional, but needed for body fat)
    const neck = parseFloat(document.getElementById('neck').value) || 0;
    const waist = parseFloat(document.getElementById('waist').value) || 0;
    const hip = parseFloat(document.getElementById('hip').value) || 0;

    if (!age || !weight || !height) {
      alert('رجاءً املأ جميع الحقول الأساسية: العمر، الوزن، والطول.');
      return;
    }

    // 1. Calculate BMR (Mifflin-St Jeor)
    let bmr = 0;
    if (gender === 'male') {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    // 2. Calculate TDEE
    const tdee = bmr * activity;

    // 3. Calculate Target Calories based on Goal
    let targetCalories = tdee;
    let goalText = '';
    if (goal === 'loss') {
      targetCalories = tdee - (tdee * 0.20); // 20% deficit
      goalText = 'خسارة دهون (تنشيف)';
    } else if (goal === 'maintain') {
      targetCalories = tdee;
      goalText = 'المحافظة على الوزن';
    } else if (goal === 'gain') {
      targetCalories = tdee + 350; // Lean bulk surplus
      goalText = 'بناء عضلات (تضخيم)';
    }

    targetCalories = Math.round(targetCalories);
    const roundedBmr = Math.round(bmr);
    const roundedTdee = Math.round(tdee);

    // 4. Calculate Body Fat (US Navy Formula)
    let bodyFat = null;
    let bfMessage = '';
    if (neck > 0 && waist > 0) {
      if (gender === 'male' && waist > neck) {
        // BF% = 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
        const density = 1.0324 - (0.19077 * Math.log10(waist - neck)) + (0.15456 * Math.log10(height));
        bodyFat = (495 / density) - 450;
      } else if (gender === 'female' && (waist + hip) > neck && hip > 0) {
        // BF% = 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
        const density = 1.29579 - (0.35004 * Math.log10(waist + hip - neck)) + (0.22100 * Math.log10(height));
        bodyFat = (495 / density) - 450;
      }
    }

    // Visual feedback button loader
    const btn = document.querySelector('button[onclick="calculateResults()"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> جاري الحساب...';
    btn.disabled = true;
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      if (window.lucide) window.lucide.createIcons();

      // Show results card
      resultsCard.classList.remove('hidden');

      // Update basic calorie elements
      targetCaloriesEl.textContent = targetCalories.toLocaleString('ar-EG');
      bmrResultEl.textContent = roundedBmr.toLocaleString('ar-EG') + ' سعرة';
      tdeeResultEl.textContent = roundedTdee.toLocaleString('ar-EG') + ' سعرة';

      // 5. Update Macros
      // Protein: 2.2g per kg bodyweight
      const proteinG = Math.round(weight * 2.2);
      const proteinKcal = proteinG * 4;

      // Fats: 25% of target calories
      const fatsKcal = Math.round(targetCalories * 0.25);
      const fatsG = Math.round(fatsKcal / 9);

      // Carbs: Remaining calories
      const carbsKcal = Math.max(0, targetCalories - (proteinKcal + (fatsG * 9)));
      const carbsG = Math.round(carbsKcal / 4);

      macroProteinEl.textContent = proteinG.toLocaleString('ar-EG');
      macroProteinKcalEl.textContent = proteinKcal.toLocaleString('ar-EG');
      macroCarbsEl.textContent = carbsG.toLocaleString('ar-EG');
      macroCarbsKcalEl.textContent = carbsKcal.toLocaleString('ar-EG');
      macroFatsEl.textContent = fatsG.toLocaleString('ar-EG');
      macroFatsKcalEl.textContent = (fatsG * 9).toLocaleString('ar-EG');

      const totalMacrosG = proteinG + carbsG + fatsG;
      const proteinPct = Math.round((proteinG / totalMacrosG) * 100) || 0;
      const carbsPct = Math.round((carbsG / totalMacrosG) * 100) || 0;
      const fatsPct = Math.round((fatsG / totalMacrosG) * 100) || 0;

      barProtein.style.width = `${proteinPct}%`;
      barCarbs.style.width = `${carbsPct}%`;
      barFats.style.width = `${fatsPct}%`;

      // 6. Handle Body Fat Display
      const hasValidBF = bodyFat !== null && bodyFat > 0 && bodyFat < 100;
      if (hasValidBF) {
        const roundedBF = Math.round(bodyFat * 10) / 10;
        bfResult.textContent = `${roundedBF.toLocaleString('ar-EG')}%`;

        // Update progress ring
        if (progressCircle) {
          const radius = progressCircle.r.baseVal.value;
          const circumference = radius * 2 * Math.PI;
          progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
          const offset = circumference - (Math.min(roundedBF, 50) / 50) * circumference;
          progressCircle.style.strokeDashoffset = offset;
        }

        // Set message based on body fat range
        if (gender === 'male') {
          if (roundedBF < 6) { bfMessage = 'نسبة دهون منخفضة جداً (حالة جفاف رياضي).'; }
          else if (roundedBF < 14) { bfMessage = 'نسبة دهون مثالية ومستوى رياضي ممتاز.'; }
          else if (roundedBF < 18) { bfMessage = 'مستوى لياقة بدنية جيد ومظهر متناسق.'; }
          else if (roundedBF < 25) { bfMessage = 'مستوى دهون مقبول، يفضل البدء في التنشيف.'; }
          else { bfMessage = 'نسبة دهون مرتفعة، ينصح بالالتزام بنظام حرق الدهون.'; }
        } else {
          if (roundedBF < 14) { bfMessage = 'نسبة دهون منخفضة جداً قد تؤثر على الهرمونات.'; }
          else if (roundedBF < 21) { bfMessage = 'نسبة دهون مثالية ومظهر رياضي متناسق.'; }
          else if (roundedBF < 25) { bfMessage = 'مستوى لياقة بدنية ممتاز وصحة جيدة.'; }
          else if (roundedBF < 32) { bfMessage = 'مستوى دهون مقبول، يفضل البدء بنشاط حركي.'; }
          else { bfMessage = 'نسبة دهون مرتفعة، ينصح باتباع نظام غذائي متكامل.'; }
        }
        bfText.textContent = bfMessage;
      } else {
        bfResult.textContent = '--';
        if (neck > 0 && waist > 0) {
          if (gender === 'male' && waist <= neck) {
            bfText.textContent = 'الرجاء التأكد من صحة القياسات المدخلة (محيط الخصر يجب أن يكون أكبر من محيط الرقبة للذكور).';
          } else if (gender === 'female' && (waist + hip) <= neck) {
            bfText.textContent = 'الرجاء التأكد من صحة القياسات المدخلة (مجموع الخصر والردف يجب أن يكون أكبر من الرقبة للإناث).';
          } else {
            bfText.textContent = 'الرجاء التأكد من صحة القياسات المدخلة لتقدير نسبة الدهون بشكل صحيح.';
          }
        } else {
          bfText.textContent = 'أدخل قياسات الرقبة والخصر والردف لحساب نسبة الدهون.';
        }
        if (progressCircle) {
          progressCircle.style.strokeDashoffset = progressCircle.r.baseVal.value * 2 * Math.PI;
        }
      }

      // 7. Generate WhatsApp Link
      const bfSectionText = hasValidBF ? `• نسبة الدهون المحسوبة: ${Math.round(bodyFat * 10) / 10}%\n` : '';
      const messageText = `مرحباً كوتش يوسف، قمت بحساب سعراتي وااحتياجاتي عبر حاسبة موقع نواة البدنية المحدثة، وهذه هي التفاصيل:\n\n` +
                          `• الجنس: ${gender === 'male' ? 'ذكر' : 'أنثى'}\n` +
                          `• العمر: ${age} سنة\n` +
                          `• الوزن: ${weight} كجم\n` +
                          `• الطول: ${height} سم\n` +
                          `• الهدف: ${goalText}\n` +
                          bfSectionText +
                          `• الاحتياج اليومي المستهدف: ${targetCalories} سعرة حرارية\n` +
                          `• معدل BMR: ${roundedBmr} سعرة\n` +
                          `• معدل TDEE: ${roundedTdee} سعرة\n\n` +
                          `توزيع الماكروز المقترح:\n` +
                          `• البروتين: ${proteinG} جرام (${proteinKcal} سعرة)\n` +
                          `• الكربوهيدرات: ${carbsG} جرام (${carbsKcal} سعرة)\n` +
                          `• الدهون: ${fatsG} جرام (${fatsG * 9} سعرة)\n\n` +
                          `أود الاستفادة من خبرتك وتصميم برنامجي المخصص للبدء فوراً!`;

      const encodedMessage = encodeURIComponent(messageText);
      whatsappCalcBtn.setAttribute('href', `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`);

      // Scroll results card into view smoothly
      resultsCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 800);
  };
});
